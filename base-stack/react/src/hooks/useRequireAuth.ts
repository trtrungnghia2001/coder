import { useAuthStore } from '@/features/_authentication/data/store'
import { useNavigate, useLocation } from 'react-router-dom'

export function useRequireAuth() {
  const { auth } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  return (callback: () => void) => {
    if (!auth) {
      // redirect nhưng vẫn giữ trạng thái trang hiện tại
      return navigate('/signin', { state: { from: location } })
    }

    // đã đăng nhập => chạy action
    callback()
  }
}
