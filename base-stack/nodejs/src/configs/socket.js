import { Server } from 'socket.io'
import express from 'express'
import http from 'http'
import envConfig from './env.js'

const app = express()
const server = http.createServer(app)

let io
const userMap = new Map()
const getSocketId = (userId) => userMap.get(userId)

export async function connectSocket() {
  server.listen(envConfig.PORT_SOCKET, () => {
    console.log(`Socket running on port:: `, envConfig.PORT_SOCKET)
  })

  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })
  io.on('connection', (socket) => {
    console.log(`Socket connected: `, socket.id)
    const userId = socket.handshake.auth.userId
    if (userId) {
      userMap.set(userId, socket.id)
      io.emit('onlineUsers', Array.from(userMap.keys()))
    }

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id)

      userMap.delete(userId)
      io.emit('onlineUsers', Array.from(userMap.keys()))
    })
  })
}

export { io, app, server, getSocketId }
