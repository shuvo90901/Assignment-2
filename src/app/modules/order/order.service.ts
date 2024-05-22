import { OrderModel } from '../order.model'
import Order from './order.interface'

const createOrderIntoDB = async (orderData: Order) => {
  // const result = await productModel.create(product)

  const order = new OrderModel(orderData)
  const result = await order.save()
  return result
}

const getAllOrdersFromDB = async (email: string | undefined) => {
  let result
  if (email) {
    result = await OrderModel.findOne({ email })
  } else {
    result = await OrderModel.find()
  }
  return result
}

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
}
