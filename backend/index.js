import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import connectDb from './config/db.js'
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import userRouter from './routes/user.routes.js'
import geminiResponse from './gemini.js'


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "https://ai-virtual-assistant-backend-ttm7.onrender.com",
    credentials: true
}))
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)


const port = process.env.PORT
app.listen(port, () => {
    connectDb()
    console.log(`server is listening to port ${port}`)
})
