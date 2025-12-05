import z from 'zod'

export const formSignupSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Please enter your name')
      .min(6, 'Name must be at least 6 characters long'),
    email: z.email({
      error: (iss) =>
        iss.input === '' ? 'Please enter your email' : undefined,
    }),
    password: z
      .string()
      .min(1, 'Please enter your password')
      .min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z
      .string()
      .min(1, 'Please confirm your password')
      .min(6, 'Password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  })
export type SignupDTO = z.infer<typeof formSignupSchema>

//
export const formSigninSchema = z.object({
  email: z.email({
    error: (iss) => (iss.input === '' ? 'Please enter your email' : undefined),
  }),
  password: z
    .string()
    .min(1, 'Please enter your password')
    .min(6, 'Password must be at least 6 characters long'),
})
export type SigninDTO = z.infer<typeof formSigninSchema>

//
export const formForgotPasswordSchema = z.object({
  email: z.email({
    error: (iss) => (iss.input === '' ? 'Please enter your email' : undefined),
  }),
})
export type ForgotPasswordDTO = z.infer<typeof formForgotPasswordSchema>

//
export const formResetPasswordSchema = z
  .object({
    token: z.string(),
    password: z
      .string()
      .min(1, 'Please enter your password')
      .min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z
      .string()
      .min(1, 'Please confirm your password')
      .min(6, 'Password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  })
export type ResetPasswordDTO = z.infer<typeof formResetPasswordSchema>

//
export const formOtpSchema = z.object({
  otp: z
    .string()
    .min(6, 'Please enter the 6-digit code.')
    .max(6, 'Please enter the 6-digit code.'),
})
export type OtpDTO = z.infer<typeof formOtpSchema>

export const formUpdateMeSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  username: z.string().trim().min(1, 'Username is required'),
  address: z.string().optional(),
  gender: z.string().optional(),
  avatarUrl: z.string().url('Invalid URL').optional().or(z.string().max(0)),
  bio: z.string().optional(),
  phoneNumber: z.string().optional(),
  work: z.string().optional(),
  education: z.string().optional(),
  socialLinks: z
    .array(
      z.object({
        value: z.string().url('Invalid URL'),
      }),
    )
    .optional(),
})
export type UpdateMeDTO = z.infer<typeof formUpdateMeSchema>
