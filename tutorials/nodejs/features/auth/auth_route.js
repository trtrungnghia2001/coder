import express from "express";
import bcryptjs from "bcryptjs";
import cryptojs from "crypto-js";
import validator from "validator";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import user_model from "./user_model.js";

function generatorAccessToken(data) {
  return jwt.sign({ ...data }, process.env.JWT_ACCESSTOKEN_KEY, {
    expiresIn: "1d",
  });
}
function generatorRefreshToken(data) {
  return jwt.sign({ ...data }, process.env.JWT_REFRESHTOKEN_KEY, {
    expiresIn: "30d",
  });
}
function sendEmail(email, link) {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS_EMAIL,
      },
    });

    var mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Sending Email using Node.js",
      html: `<p>Click link: http://localhost:5000/api/auth/reset-password/${link}</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
const verifyToken = async (req, res, next) => {
  const { access_token } = req.cookies;

  console.log({ access_token });
  if (!access_token)
    return res.status(404).json({
      status: 404,
      message: "You are not auth!",
    });

  jwt.verify(access_token, process.env.JWT_ACCESSTOKEN_KEY, (err, result) => {
    if (err) throw err;
    req.user = result;
    next();
  });
};

// with mongodb
const auth_route_mongodb = express.Router();

auth_route_mongodb.post(`/signup`, async (req, res) => {
  try {
    const { password, email, name } = req.body;
    if (
      !validator.isEmail(email) ||
      !validator.isLength(name, { min: 6 }) ||
      !validator.isLength(password, { min: 6 })
    ) {
      return res.status(400).json({ status: 400, message: "Invalid Feild" });
    }

    const checkEmail = await user_model.findOne({ email });
    if (checkEmail)
      return res.status(409).json({ status: 409, message: "Email is exists" });

    const hashPassword = await bcryptjs.hash(password, 12);
    const data = await user_model.create({
      ...req.body,
      password: hashPassword,
    });

    if (!data)
      return res.status(403).json({ status: 403, message: "Sign Up failed" });

    return res
      .status(200)
      .json({ status: 200, message: "Sign Up successfully" });
  } catch (error) {
    console.log(error);
  }
});

auth_route_mongodb.post(`/signin`, async (req, res) => {
  try {
    const { password, email } = req.body;
    if (
      !validator.isEmail(email) ||
      !validator.isLength(password, { min: 6 })
    ) {
      return res.status(400).json({ status: 400, message: "Invalid Feild" });
    }
    const checkEmail = await user_model.findOne({ email });
    const checkPassword = await bcryptjs.compare(
      password,
      checkEmail?.password
    );

    if (!checkEmail || !checkPassword)
      return res
        .status(404)
        .json({ status: 404, message: "Invalid email or password" });

    const access_token = generatorAccessToken({
      id: checkEmail._doc._id,
      email: checkEmail._doc.email,
      role: checkEmail._doc.role,
    });
    const refresh_token = generatorRefreshToken({
      id: checkEmail._doc._id,
      email: checkEmail._doc.email,
      role: checkEmail._doc.role,
    });

    const data = { ...checkEmail._doc, access_token };

    res.cookie("access_token", access_token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      status: 200,
      message: "Sign in successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
});

auth_route_mongodb.post(`/forgot-password`, async (req, res) => {
  try {
    const { email } = req.body;
    if (!validator.isEmail(email)) {
      return res.status(400).json({ status: 400, message: "Invalid Field" });
    }

    const link_refresh_token = cryptojs
      .SHA256(email + new Date().toString())
      .toString();

    const data = await user_model.findOneAndUpdate(
      { email },
      { refresh_token: link_refresh_token },
      { new: true }
    );

    if (!data)
      return res.status(200).json({
        status: 200,
        message: "Send email field",
        data: null,
      });

    sendEmail(email, link_refresh_token);

    return res.status(200).json({
      status: 200,
      message: "Send email successfully",
      data: null,
    });
  } catch (error) {
    console.log(error);
  }
});

auth_route_mongodb.post(`/reset-password/:token`, async (req, res) => {
  try {
    const { token } = req.params;

    const { password } = req.body;
    const hashPassword = await bcryptjs.hash(password, 12);

    const data = await user_model.findOneAndUpdate(
      { refresh_token: token },
      { password: hashPassword, refresh_token: "" },
      { new: true }
    );

    if (!data)
      return res.status(404).json({
        status: 404,
        message: "Reset password failed",
      });

    return res
      .status(200)
      .json({ status: 200, message: "Reset password successfully" });
  } catch (error) {
    console.log(error);
  }
});

auth_route_mongodb.post(`/update-frofile`, verifyToken, async (req, res) => {
  try {
    const user = req.user;
    const body = req.body;

    const data = await user_model.findByIdAndUpdate(user?.id, body, {
      new: true,
    });

    if (!data)
      return res.status(404).json({
        status: 404,
        message: "Update profile failed",
      });

    return res
      .status(200)
      .json({ status: 200, message: "Update profile successfully" });
  } catch (error) {
    console.log(error);
  }
});

auth_route_mongodb.post(`/logout`, verifyToken, async (req, res) => {
  try {
    const user = req.user;
    const data = await user_model.findByIdAndUpdate(
      user?.id,
      { password: hashPassword, refresh_token: "" },
      { new: true }
    );

    if (!data)
      return res.status(404).json({
        status: 404,
        message: "Loggout failed",
      });

    res.clearCookie("refresh_token");

    return res
      .status(200)
      .json({ status: 200, message: "Loggout successfully" });
  } catch (error) {
    console.log(error);
  }
});

export { auth_route_mongodb };
