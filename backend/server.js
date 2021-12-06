import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'

import { notFound, errorHandler } from './middleware/errorMiddleware.js'
const app = express()

app.use(cors())
app.options('*', cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('tiny'))

dotenv.config()

connectDB()


app.get('/', (req,res) => {
    res.send('Api is running')
})

app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname,'/uploads')))


app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, console.log(`Server ruuning on port ${PORT}`))