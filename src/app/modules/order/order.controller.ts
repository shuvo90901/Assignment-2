import { Request, Response } from 'express'
import OrderValidateSchema from './order.validation'
import { OrderServices } from './order.service'
import { ProductServices } from '../product/product.service'

// Controller function to handle order creation
const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body

    // Validate the order data using Zod schema
    const zodparsedData = OrderValidateSchema.parse(orderData)

    // Fetch product details from the database
    const product = await ProductServices.getSingleProductFromDB(
      zodparsedData.productId,
    )

    // If the product is not found, return an error response
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
      // Calculate the remaining stock after the order
      const stocked = product.inventory.quantity - orderData.quantity

      // Determine the new inventory state
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

        // Create the order in the database
        result = await OrderServices.createOrderIntoDB(zodparsedData)
        if (result) {
          // Update the product's inventory in the database
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const updatedProduct =
            await ProductServices.updateSingleProductFromDB(
              zodparsedData.productId,
              { inventory },
            )
        }
      }
      if (stocked < 0) {
        // Handle insufficient stock scenario
        successMsg = 'Insufficient quantity available in inventory'
      }

      // Send the appropriate response based on the operation result
      res.status(200).json({
        success: true,
        message: successMsg,
        data: result,
      })
    }
  } catch (err) {
    // Handle any unexpected errors
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    })
  }
}

// Controller function to fetch all orders or orders by email
const getAllOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.query as { email: string | undefined }

    // Fetch all orders from the database, optionally filtering by email
    const result = await OrderServices.getAllOrdersFromDB(email)

    if (typeof email === 'string' && result) {
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      })
    }
    if (typeof email === 'undefined' && result) {
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      })
    }
    if (typeof email === 'string' && !result) {
      res.status(500).json({
        success: false,
        message: 'Order not found',
      })
    }
  } catch (err) {
    // Handle any unexpected errors
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    })
  }
}

// Export the order controllers
export const OrderControllers = {
  createOrder,
  getAllOrder,
}
