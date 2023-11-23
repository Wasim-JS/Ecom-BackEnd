import express from 'express'
import authRouter from './routes/authRoutes.js'
import productRouter from './routes/productRoute.js'
import errorHandler from './utiles/ErrorHandler.js'
import cookieParser from 'cookie-parser'
const app = express()


// middleware
app.use(express.json())
app.use(cookieParser())

//Routes
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/product',productRouter)


// Error Handling
app.use(errorHandler)

export {app} 