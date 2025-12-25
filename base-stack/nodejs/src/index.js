import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'
import passport from 'passport'
import { handleResponse } from './utils/response.js'
import { connectMongoDB } from './configs/database.js'
import envConfig from './configs/env.js'
import { defaultCookieOptions } from './features/auth/auth.service.js'
import passportConfig from './configs/passport.js'
import authRouter from './features/auth/auth.route.js'
import productRoute from './features/product/product.route.js'
import { connectSocket } from './configs/socket.js'

await connectMongoDB()
await connectSocket()
const app = express()
app.use(
  cors({
    origin: [`http://localhost:5173`],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200,
  }),
)
app.use(cookieParser())
app.use(
  bodyParser.json({
    limit: '50mb',
  }),
)
app.use(
  session({
    secret: envConfig.JWT_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: defaultCookieOptions,
  }),
)
// passport
app.use(passport.initialize())
app.use(passport.session())

app.use(`/api/auth`, authRouter)
app.use(`/api/product`, productRoute)

if (!envConfig.IS_PRODUCTION) {
  app.listen(envConfig.PORT, function () {
    console.log(`Server running on port:: `, envConfig.PORT)
  })
}

app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message

  console.error(`Error::`, err.stack)

  return handleResponse(res, {
    status,
    message,
    success: false,
  })
})

export default app
