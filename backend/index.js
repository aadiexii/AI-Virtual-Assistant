import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import connectDb from './config/db.js'
app.use(express.json())


const port = process.env.PORT
app.listen(port, () => {
    connectDb()
    console.log(`server is listening to port ${port}`)
})