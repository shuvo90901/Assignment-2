import { OrderModel } from '../order.model'
import Order from './order.interface'

// Function to create a new order in the database
const createOrderIntoDB = async (orderData: Order) => {
  // Create a new instance of the OrderModel with the provided order data
  const order = new OrderModel(orderData)
  const result = await order.save()
  return result
}

// Function to fetch all orders from the database, optionally filtering by email
const getAllOrdersFromDB = async (email: string | undefined) => {
  let result

  // If an email is provided, fetch orders associated with that email
  if (email) {
    result = await OrderModel.find({ email })
  } else {
    // Otherwise, fetch all orders
    result = await OrderModel.find()
  }
  return result
}

// Export all the order-related database service functions
export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
}
