import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { handleResponse } from '#src/utils/response'
import envConfig from '#src/configs/env'
import UserModel from '../user/user.model.js'
import { generateAuthTokensAndSetCookies } from './auth.service.js'
import { sendPasswordResetEmail } from '#src/services/email'
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from '#src/services/cloudinary'

export async function signupController(req, res, next) {
  try {
    const body = req.body
    // check exists user
    const userExists = await UserModel.findOne({
      email: body.email,
    })

    if (userExists) {
      throw createHttpError.Conflict('User already exists')
    }

    const newUser = await UserModel.create(body)

    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: `Signup successfully!`,
      data: newUser,
    })
  } catch (error) {
    next(error)
  }
}
export async function signinController(req, res, next) {
  try {
    const body = req.body
    // check exists user
    const userExists = await UserModel.findOne({
      email: body.email,
    }).select(['+password'])

    if (!userExists) {
      throw createHttpError.BadRequest('Invalid email or password')
    }
    // compare password
    const isMatchPassword = await userExists.isPasswordMatch(body.password)
    if (!isMatchPassword) {
      throw createHttpError.BadRequest('Invalid email or password')
    }

    const payload = {
      _id: userExists._id,
      email: userExists.email,
      role: userExists.role,
    }
    const { accessToken } = await generateAuthTokensAndSetCookies(res, payload)

    const { password, ...other } = userExists._doc

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: `Signin successfully!`,
      data: {
        ...other,
        accessToken,
      },
    })
  } catch (error) {
    next(error)
  }
}
export async function signoutController(req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken
    // clear token from cookie
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    res.clearCookie('connect.sid')

    // remove token from database
    await UserModel.findOneAndUpdate(
      { refreshToken: refreshToken },
      { refreshTokens: refreshToken },
    )

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: `Signout successfully!`,
      data: null,
    })
  } catch (error) {
    next(error)
  }
}
export async function getMeController(req, res, next) {
  try {
    const user = req.user
    const getUser = await UserModel.findById(user._id)

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: `Get me successfully!`,
      data: getUser,
    })
  } catch (error) {
    next(error)
  }
}
export async function updateMeController(req, res, next) {
  try {
    const user = req.user
    const body = req.body
    const file = req.file

    let avatar = body.avatar
    // upload file
    if (file) {
      avatar = (await uploadToCloudinary(file)).url
      if (body.avatar) {
        await deleteFromCloudinary(body.avatar)
      }
    }

    const userUpdate = await UserModel.findByIdAndUpdate(
      user._id,
      { ...body, avatar },
      { new: true },
    )

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: `User updated successfully!`,
      data: userUpdate,
    })
  } catch (error) {
    next(error)
  }
}
export async function changePasswordController(req, res, next) {
  try {
    const user = req.user
    const { password } = req.body

    const userExists = await UserModel.findById(user._id)
    if (!userExists) {
      throw new Error('User not found')
    }

    userExists.password = password
    await userExists.save()

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: `Password changed successfully!`,
    })
  } catch (error) {
    next(error)
  }
}
export async function refreshTokenController(req, res, next) {
  try {
    const { refreshToken } = req.cookies

    if (!refreshToken) {
      throw createHttpError.Unauthorized(
        'Refresh Token not found. Please log in again.',
      )
    }

    const decoded = await jwt.verify(
      refreshToken,
      envConfig.JWT_REFRESH_SECRET_KEY,
    )

    const user = await UserModel.findById(decoded._id).select('+refreshToken')

    if (!user || !user.refreshToken) {
      throw createHttpError.Unauthorized(
        'Invalid Refresh Token or Token revoked. Please log in again.',
      )
    }

    const payload = { _id: user._id, email: user.email, role: user.role }

    const { accessToken } = await generateAuthTokensAndSetCookies(res, payload)

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: `Refresh token successfully!`,
      data: accessToken,
    })
  } catch (error) {
    // clear token from cookie
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    res.clearCookie('connect.sid')

    next(error)
  }
}
export async function forgotPasswordController(req, res, next) {
  try {
    const { email } = req.body

    const user = await UserModel.findOne({ email })
    if (!user) {
      return handleResponse(res, {
        status: StatusCodes.OK,
        message: `If a user with that email exists, a password reset email has been sent.`,
      })
    }

    const payload = { _id: user._id, email: user.email }

    const token = await jwt.sign(
      payload,
      envConfig.JWT_RESET_PASSWORD_SECRET_KEY,
      { expiresIn: envConfig.JWT_RESET_PASSWORD_SECRET_EXPIRES },
    )

    await UserModel.findByIdAndUpdate(
      user._id,
      {
        resetPasswordToken: token,
      },
      { new: true },
    )

    // --- Gửi email cho người dùng ---
    const resetUrl = `${envConfig.WEB_URL}/reset-password?token=${token}`
    await sendPasswordResetEmail(user.email, resetUrl)

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: `If a user with that email exists, a password reset email has been sent.`,
    })
  } catch (error) {
    next(error)
  }
}
export async function resetPasswordController(req, res, next) {
  try {
    const { token, password } = req.body

    let decoded
    try {
      decoded = jwt.verify(token, envConfig.JWT_RESET_PASSWORD_SECRET_KEY)
    } catch (err) {
      throw createHttpError.BadRequest('Invalid or expired token.')
    }

    // Tìm người dùng bằng token và kiểm tra thời gian hết hạn
    const user = await UserModel.findOne({
      _id: decoded._id,
      resetPasswordToken: token,
    }).select(['+password', '+resetPasswordToken'])

    if (!user) {
      throw createHttpError.BadRequest('User no longer exists.')
    }

    user.password = password
    user.resetPasswordToken = undefined

    await user.save()

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: `Password has been reset successfully!`,
    })
  } catch (error) {
    next(error)
  }
}

// ================= passport =================
export async function passportSigninSuccessController(req, res, next) {
  try {
    const user = req.user

    if (!user) {
      throw createHttpError.Unauthorized(
        'User not authenticated for signin-success API.',
      )
    }

    const payload = {
      _id: user._id,
      email: user.email,
      role: user.role,
    }

    const { accessToken } = await generateAuthTokensAndSetCookies(res, payload)

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: `Signin successfully!`,
      data: {
        ...user,
        accessToken,
      },
    })
  } catch (error) {
    next(error)
  }
}
export async function passportSigninFailedController(req, res, next) {
  try {
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: `Signin failed!`,
    })
  } catch (error) {
    next(error)
  }
}
