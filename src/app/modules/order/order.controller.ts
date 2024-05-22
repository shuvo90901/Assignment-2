import { Request, Response } from 'express'
import OrderValidateSchema from './order.validation'
import { OrderServices } from './order.service'

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body

    const zodparsedData = OrderValidateSchema.parse(orderData)

    const result = await OrderServices.createOrderIntoDB(zodparsedData)

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    })
  }
}

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.query

    const result = await OrderServices.getAllOrdersFromDB(email)

    if (email) {
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      })
    } else {
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    })
  }
}

export const OrderControllers = {
  createOrder,
  getAllOrder,
}
