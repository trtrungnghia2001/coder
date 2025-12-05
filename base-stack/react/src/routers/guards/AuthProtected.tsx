import { Navigate, useLocation } from 'react-router-dom'
import type React from 'react'
import { useAuthStore } from '@/features/_authentication/data/store'

const AuthProtected = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useAuthStore()
  const location = useLocation()

  if (!auth) return <Navigate to={`/signin`} state={location} />

  return children
}

export default AuthProtected
