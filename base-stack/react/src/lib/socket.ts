import { io } from 'socket.io-client'
import envConfig from './env'
export const socket = io(envConfig.SOCKET_URL, {
  autoConnect: false,
})
