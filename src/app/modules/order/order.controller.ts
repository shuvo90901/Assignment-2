import { Request, Response } from 'express'
import OrderValidateSchema from './order.validation'
import { OrderServices } from './order.service'
import { ProductServices } from '../product/product.service'

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body
    const zodparsedData = OrderValidateSchema.parse(orderData)
    const product = await ProductServices.getSingleProductFromDB(
      zodparsedData.productId,
    )
    if (!product) {
      res.status(500).json({
        success: false,
        message:
          'Product not found! You must be input actual productId from product.',
        data: null,
      })
    }
    let result
    let successMsg
    if (product) {
      const stocked = product.inventory.quantity - orderData.quantity
      if (stocked >= 0) {
        successMsg = 'Order created successfully!'
        let inventory = {
          quantity: stocked,
          inStock: true,
        }
        if (stocked > 0) {
          inventory = {
            quantity: stocked,
            inStock: true,
          }
        }
        if (stocked === 0) {
          inventory = {
            quantity: stocked,
            inStock: false,
          }
        }
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const updatedProduct = await ProductServices.updateSingleProductFromDB(
          zodparsedData.productId,
          { inventory },
        )
        result = await OrderServices.createOrderIntoDB(zodparsedData)
      }
      if (stocked < 0) {
        successMsg = 'Insufficient quantity available in inventory'
      }

      res.status(200).json({
        success: true,
        message: successMsg,
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

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.query as { email: string | undefined }

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
