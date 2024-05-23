import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { ProductRoutes } from './app/modules/product/product.route'
import { OrderRoutes } from './app/modules/order/order.route'

// Create an instance of the express application
const app: Application = express()

// Middleware to parse JSON request bodies
app.use(express.json())
// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors())

// Route for handling product-related requests
app.use('/api/products', ProductRoutes)

// Route for handling order-related requests
app.use('/api/orders', OrderRoutes)

// Controller function to handle the root route and send a welcome message
const getAController = (req: Request, res: Response) => {
  const text = 'Welcome to our API!'
  res.send(text)
}

// Define the root route
app.get('/', getAController)

// Middleware to handle undefined routes (404 Not Found)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

// Export the app instance for use in other parts of the application
export default app
