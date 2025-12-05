import axiosInstance, { type ApiResponse } from '@/lib/axios'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import type {
  ForgotPasswordDTO,
  OtpDTO,
  ResetPasswordDTO,
  SigninDTO,
  SignupDTO,
} from './schema'
import type { AuthType } from './type'
import envConfig from '@/lib/env'

type AuthStoreType = {
  auth: AuthType | null
  signin: (data: SigninDTO) => Promise<ApiResponse<AuthType>>
  signup: (data: SignupDTO) => Promise<ApiResponse<AuthType>>
  signout: () => Promise<ApiResponse<AuthType>>
  forgotPassword: (data: ForgotPasswordDTO) => Promise<ApiResponse<void>>
  resetPassword: (data: ResetPasswordDTO) => Promise<ApiResponse<void>>
  opt: (data: OtpDTO) => Promise<ApiResponse<void>>
  getMe: () => Promise<ApiResponse<AuthType>>
  updateMe: (data: FormData) => Promise<ApiResponse<AuthType>>
  signinWithSocialMedia: (social: 'google' | 'github') => void
  signinWithSocialMediaSuccess: () => Promise<ApiResponse<AuthType>>
}

export const useAuthStore = create<AuthStoreType>()(
  devtools(
    persist(
      (set, get) => ({
        auth: null,
        signin: async (data) => {
          const resp = (
            await axiosInstance.post<ApiResponse<AuthType>>(`auth/signin`, data)
          ).data

          set({
            auth: resp.data,
          })

          return resp
        },
        signup: async (data) => {
          const resp = (
            await axiosInstance.post<ApiResponse<AuthType>>(`auth/signup`, data)
          ).data

          return resp
        },
        signout: async () => {
          const resp = (
            await axiosInstance.post<ApiResponse<AuthType>>(`auth/signout`)
          ).data

          set({
            auth: null,
          })

          return resp
        },
        forgotPassword: async (data) => {
          const resp = (
            await axiosInstance.post<ApiResponse<void>>(
              `auth/forgot-password`,
              data,
            )
          ).data

          return resp
        },
        resetPassword: async (data) => {
          const resp = (
            await axiosInstance.post<ApiResponse<void>>(
              `auth/reset-password`,
              data,
            )
          ).data

          return resp
        },
        opt: async (data) => {
          const resp = (
            await axiosInstance.post<ApiResponse<void>>(`auth/otp`, data)
          ).data

          return resp
        },
        getMe: async () => {
          const resp = (
            await axiosInstance.get<ApiResponse<AuthType>>(`auth/me`)
          ).data

          return resp
        },
        updateMe: async (data) => {
          const resp = (
            await axiosInstance.put<ApiResponse<AuthType>>(
              `auth/me/update`,
              data,
            )
          ).data

          set({
            auth: { ...get().auth, ...resp.data },
          })

          return resp
        },
        signinWithSocialMedia: (social) => {
          const url = envConfig.API_URL + `/auth/passport/` + social
          window.open(url, '_target')
        },
        signinWithSocialMediaSuccess: async () => {
          const resp = await (
            await axiosInstance.get<ApiResponse<AuthType>>(
              `/auth/passport/signin-success`,
            )
          ).data
          if (resp.status === 200 && resp.data) {
            set({
              auth: resp.data,
            })
          }

          return resp
        },
      }),
      {
        name: 'auth-state',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
)
