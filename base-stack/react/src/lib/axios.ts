import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import envConfig from './env'
import { useAuthStore } from '@/features/_authentication/data/store'

export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
  status: number
  pagination?: Pagination
}

const axiosInstance = axios.create({
  baseURL: envConfig.API_URL,
  withCredentials: true,
})

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const token = useAuthStore.getState().auth?.accessToken
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    // Do something with the request error
    return Promise.reject(error)
  },
)

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async function (error: AxiosError) {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    const responseStatus = error.response?.status
    const customError = error.response?.data ?? error

    const authState = useAuthStore.getState()

    // ⛔️ Không refresh nếu chưa signin
    if (!authState.auth) {
      return Promise.reject(customError)
    }

    // ✅ Tránh gọi refresh nhiều lần hoặc gọi chính nó
    if (
      responseStatus === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== '/auth/refresh-token'
    ) {
      originalRequest._retry = true

      try {
        const refreshResponse = await axios.post(
          envConfig.API_URL + `/auth/refresh-token`,
          {},
          {
            withCredentials: true,
          },
        )

        if (refreshResponse.status === 200) {
          // Gửi lại request gốc
          return axiosInstance(originalRequest)
        }

        if (refreshResponse.status === 401) {
          await authState.signout()
          return Promise.reject({ status: 401, message: 'Please login again' })
        }
      } catch (refreshError) {
        if (
          refreshError instanceof AxiosError &&
          refreshError.response?.status === 401
        ) {
          await authState.signout()
          return Promise.reject({ status: 401, message: 'Please login again' })
        }
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(customError)
  },
)

export default axiosInstance
