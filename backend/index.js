import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import connectDb from './config/db.js'
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'



app.use(express.json())
app.use(cookieParser)
app.use('/api/auth', authRouter)


const port = process.env.PORT
app.listen(port, () => {
    connectDb()
    console.log(`server is listening to port ${port}`)
})