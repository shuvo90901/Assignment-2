import { Schema, model } from 'mongoose'
import Order from './order/order.interface'

// Define the OrderItem schema
const orderSchema = new Schema<Order>({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  productId: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
})

// Create the OrderItem model
export const OrderModel = model<Order>('Order', orderSchema)
