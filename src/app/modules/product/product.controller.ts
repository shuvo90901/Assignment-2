import { Request, Response } from 'express'
import productValidationSchema from './product.validation'
import { ProductServices } from './product.service'

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body

    const zodparsedData = productValidationSchema.parse(productData)

    const result = await ProductServices.createProductIntoDB(zodparsedData)

    res.status(200).json({
      success: true,
      message: 'Product is created succesfully',
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

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsFromDB()

    res.status(200).json({
      success: true,
      message: 'Products are retrieved succesfully',
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

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params

    const result = await ProductServices.getSingleProductFromDB(productId)

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Product retrieved successfully',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving the product',
      error: err,
    })
  }
}

const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params

    const result = await ProductServices.deleteSingleProductFromDB(productId)

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while deleting the product',
      error: err,
    })
  }
}

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const { product: productData } = req.body

    const zodparsedData = productValidationSchema.parse(productData)

    const result = await ProductServices.updateSingleProductFromDB(
      productId,
      zodparsedData,
    )

    res.status(200).json({
      success: true,
      message: 'Product is Updated succesfully',
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

export const ProductControllers = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  deleteSingleProduct,
  updateSingleProduct,
}