// require dotenv (npm i dotenv) so we can use .env file
require('dotenv').config()

// use all neccessary libraries
const express = require('express')
const cors = require('cors')

// create an express application
const app = express()

// express middleware that only parses json
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(cors())

// define the port and local ip address that is going to be used
const port = process.env.PORT
const ipAddress = process.env.IPADDRESS

// user defined routers
const pizzaRouter = require('./routes/pizza')
const categoryRouter = require('./routes/pizza-category')
const sizeRouter = require('./routes/pizza-size')
const ratingRouter = require('./routes/pizza-rating')
const userRouter = require('./routes/users.js')
const ordersRouter = require('./routes/orders')
const countryStateCity = require('./routes/country-state-city')
const orderDetails = require('./routes/order-details')

// default route
app.get('/', (req, res) => {
  res.json({ message: 'ok' })
})

// use the routes that are defined in the routers
app.use('/pizza', pizzaRouter)
app.use('/category', categoryRouter)
app.use('/pizza-size', sizeRouter)
app.use('/pizza-rating', ratingRouter)
app.use('/users', userRouter)
app.use('/orders', ordersRouter)
app.use('/country-state-city', countryStateCity)
app.use('/order-details', orderDetails)

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  console.error(err.message, err.stack)
  res.status(statusCode).json({ message: err.message })
  return
})

// listen to the port, using ip address
app.listen(port, ipAddress, () => {
  console.log(`Example app listening at port: ${port}`)
})
