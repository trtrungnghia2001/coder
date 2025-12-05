import envConfig from "#src/configs/env";
import { generateToken, parseJwtExpiresToMs } from "#src/utils/jwt";
import UserModel from "../user/user.model.js";

export const defaultCookieOptions = {
  httpOnly: true,
  //   secure: true,
  //   sameSite: "None",
  secure: envConfig.IS_PRODUCTION,
  sameSite: envConfig.IS_PRODUCTION ? "none" : "lax",
};

export async function generateAuthTokensAndSetCookies(res, payload) {
  // generate token
  const accessToken = generateToken({
    payload,
    key: envConfig.JWT_SECRET_KEY,
    expiresIn: parseJwtExpiresToMs(envConfig.JWT_SECRET_EXPIRES),
  });
  const refreshToken = generateToken({
    payload,
    key: envConfig.JWT_REFRESH_SECRET_KEY,
    expiresIn: parseJwtExpiresToMs(envConfig.JWT_REFRESH_SECRET_EXPIRES),
  });

  // Đặt Access Token va Refresh Token vào cookie
  res.cookie(`accessToken`, `Bearer ` + accessToken, {
    ...defaultCookieOptions,
    maxAge: parseJwtExpiresToMs(envConfig.JWT_SECRET_EXPIRES),
  });
  res.cookie(`refreshToken`, refreshToken, {
    ...defaultCookieOptions,
    maxAge: parseJwtExpiresToMs(envConfig.JWT_REFRESH_SECRET_EXPIRES),
  });

  // Lưu Refresh Token vào database
  await UserModel.findByIdAndUpdate(
    payload._id,
    { refreshToken: refreshToken },
    { new: true }
  );

  return { accessToken, refreshToken };
}
