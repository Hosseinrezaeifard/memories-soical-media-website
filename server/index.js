import express, { json, urlencoded } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import dotenv from 'dotenv'
/*
Initializing the app with express
Use cors in order to make sure that headers are true
Add the '/posts' to every routes about posts
Use json and urlencoded to send requests
Connect to database 
Running the server using mongoose
*/

const app = express()
dotenv.config()

app.use(json({ limit: '30mb', extended: true }))
app.use(urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/posts', postRoutes)
app.use('/user', userRoutes)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`server running on port ${PORT}`)))
    .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)