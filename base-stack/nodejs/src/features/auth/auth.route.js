import express from 'express'
import passport from 'passport'
import { validateAuth } from './auth.validate.js'
import {
  schemaChangePassword,
  schemaForgotPassword,
  schemaResetPassword,
  schemaSignin,
  schemaSignup,
  schemaUpdateMe,
} from './auth.schema.js'
import {
  updateMeController,
  changePasswordController,
  getMeController,
  passportSigninFailedController,
  passportSigninSuccessController,
  forgotPasswordController,
  refreshTokenController,
  resetPasswordController,
  signinController,
  signoutController,
  signupController,
} from './auth.controller.js'
import upload from '#src/configs/multer'
import { authMiddleware } from '#src/middlewares/auth.middleware'
import envConfig from '#src/configs/env'

const authRouter = express.Router()

authRouter.post(`/signup`, validateAuth(schemaSignup), signupController)

authRouter.post(`/signin`, validateAuth(schemaSignin), signinController)

authRouter.post(`/signout`, signoutController)

authRouter.get(`/me`, authMiddleware, getMeController)

authRouter.put(
  `/me/update`,
  authMiddleware,
  upload.single('avatarFile'),
  validateAuth(schemaUpdateMe),
  updateMeController,
)

authRouter.put(
  `/change-password`,
  authMiddleware,
  validateAuth(schemaChangePassword),
  changePasswordController,
)

authRouter.post(`/refresh-token`, refreshTokenController)

authRouter.post(
  `/forgot-password`,
  validateAuth(schemaForgotPassword),
  forgotPasswordController,
)

authRouter.post(
  `/reset-password`,
  validateAuth(schemaResetPassword),
  resetPasswordController,
)

// ================= passport =================
authRouter.get('/passport/signin-success', passportSigninSuccessController)
authRouter.get('/passport/signin-failed', passportSigninFailedController)

// google
authRouter.get('/passport/google', passport.authenticate('google'))
authRouter.get(
  '/passport/google/callback',
  passport.authenticate('google', {
    successRedirect: envConfig.PASSPORT_REDIRECT_SUCCESS,
    failureRedirect: envConfig.PASSPORT_REDIRECT_FAILED,
  }),
)

export default authRouter
