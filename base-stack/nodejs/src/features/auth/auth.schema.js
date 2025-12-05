import Joi from "joi";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const schemaSignup = Joi.object({
  name: Joi.string().trim().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(passwordRegex).required().messages({
    "string.pattern.base":
      "Password must contain at least one uppercase, one lowercase, one number, and one special character.",
    "string.min": "Password must be at least 8 characters long.",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Confirm password does not match password.",
  }),
});

export const schemaSignin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const schemaChangePassword = Joi.object({
  password: Joi.string().min(8).pattern(passwordRegex).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

export const schemaForgotPassword = Joi.object({
  email: Joi.string().email().required(),
});

export const schemaResetPassword = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(8).pattern(passwordRegex).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

export const schemaUpdateMe = Joi.object({
  name: Joi.string().trim().min(3).max(50).optional(),
  username: Joi.string().trim().min(3).max(50).optional(),
  gender: Joi.string().allow("").optional(),
  avatarUrl: Joi.string().uri().allow("").optional(),
  phoneNumber: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .allow("")
    .optional(),
  address: Joi.string().allow("").optional(),
  birthday: Joi.string().allow("").optional(),
  work: Joi.string().allow("").optional(),
  education: Joi.string().allow("").optional(),
  bio: Joi.string().max(255).allow("").optional(),
  socialLinks: Joi.array().items(Joi.string().uri()).optional(),
});
