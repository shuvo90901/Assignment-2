import { Request, Response } from 'express'
import productValidationSchema from './product.validation'
import { ProductServices } from './product.service'

// Controller function to handle product creation
const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body

    // Validate the product data using Zod schema
    const zodparsedData = productValidationSchema.parse(productData)

    // Create the product in the database
    const result = await ProductServices.createProductIntoDB(zodparsedData)

    // Send a success response with the created product data
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    })
  } catch (err) {
    // Handle any unexpected errors
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    })
  }
}

// Controller function to fetch all products or products matching a search term
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query as { searchTerm: string | undefined }

    // Create a regex for case-insensitive search
    const regex = new RegExp(`^${searchTerm}`, 'i')

    // Fetch all products from the database, optionally filtering by search term
    const result = await ProductServices.getAllProductsFromDB(regex, searchTerm)

    // Send appropriate response based on whether a search term was provided
    if (searchTerm) {
      res.status(200).json({
        success: true,
        message: 'Products matching search term {VALUE} fetched successfully!',
        data: result,
      })
    } else {
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
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

// Controller function to fetch a single product by its ID
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params

    // Fetch the product from the database using its ID
    const result = await ProductServices.getSingleProductFromDB(productId)

    // If the product is not found, return a 404 error response
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      })
    }

    // Send a success response with the fetched product data
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    })
  } catch (err) {
    // Handle any unexpected errors
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving the product',
      error: err,
    })
  }
}

// Controller function to delete a single product by its ID
const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params

    // Delete the product from the database using its ID
    const result = await ProductServices.deleteSingleProductFromDB(productId)

    // If the product is not found, return a 404 error response
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      })
    }

    // Send a success response indicating the product was deleted
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: result,
    })
  } catch (err) {
    // Handle any unexpected errors
    res.status(500).json({
      success: false,
      message: 'An error occurred while deleting the product',
      error: err,
    })
  }
}

// Controller function to update a single product by its ID
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const { product: productData } = req.body

    // Validate the updated product data using Zod schema
    const zodparsedData = productValidationSchema.parse(productData)

    // Update the product in the database using its ID
    const result = await ProductServices.updateSingleProductFromDB(
      productId,
      zodparsedData,
    )

    // Send a success response with the updated product data
    res.status(200).json({
      success: true,
      message: 'Product Updated succesfully',
      data: result,
    })
  } catch (err) {
    // Handle any unexpected errors
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    })
  }
}

// Export the product controllers
export const ProductControllers = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  deleteSingleProduct,
  updateSingleProduct,
}
