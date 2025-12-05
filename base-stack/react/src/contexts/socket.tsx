import { useAuthStore } from '@/features/_authentication/data/store'
import { socket } from '@/lib/socket'
import React, { createContext, useEffect } from 'react'

const SocketContext = createContext(null)

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useAuthStore()
  useEffect(() => {
    if (!auth) {
      socket.disconnect()
    }
    socket.auth = {
      userId: auth?._id,
    }
    if (!socket.connected) {
      socket.connect()
    }
  }, [auth])

  return (
    <SocketContext.Provider value={null}>{children}</SocketContext.Provider>
  )
}
