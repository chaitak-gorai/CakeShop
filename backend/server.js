import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import cors from 'cors'

import productRoutes from './routes/productRoutes.js'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js'

dotenv.config()
const app = express()
connectDB()
app.use(cors())

app.get('/', (req, res) => {
  res.send('API is running..')
})
app.use('/api/products', productRoutes)

//*middleware for no route found
app.use(notFound)

//* This middleware will be used to handle errors
app.use(errorHandler)

//* Start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(
    `Server started in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
)
