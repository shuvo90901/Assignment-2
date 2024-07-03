import { ProductModel } from '../product.model'
import { Product } from './product.interface'

// Function to create a new product in the database
const createProductIntoDB = async (productData: Product) => {
  // Create a new instance of the ProductModel with the provided product data
  const product = new ProductModel(productData)
  // Save the product to the database
  const result = await product.save()
  // Return the result of the save operation
  return result
}

// Function to fetch all products from the database, optionally filtering by a search term
const getAllProductsFromDB = async (
  regex: RegExp,
  searchTerm: string | undefined,
) => {
  let result

  // If a search term is provided, fetch products that match the search term
  if (searchTerm) {
    result = await ProductModel.find({ name: regex })
  } else {
    // Otherwise, fetch all products
    result = await ProductModel.find()
  }
  return result
}

// Function to fetch a single product from the database by its ID
const getSingleProductFromDB = async (_id: string) => {
  // Find a product in the database with the provided ID
  const result = await ProductModel.findById({ _id })
  return result
}

// Function to soft delete a single product from the database by its ID
const deleteSingleProductFromDB = async (_id: string) => {
  const result = await ProductModel.findByIdAndDelete(_id)
  return result
}

// Function to update a single product in the database by its ID
const updateSingleProductFromDB = async (
  _id: string,
  product: Product | { inventory: { quantity: number; inStock: boolean } },
) => {
  // Update the product in the database with the provided data
  const result = await ProductModel.updateOne({ _id }, product)
  return result
}

// Export all the product-related database service functions
export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteSingleProductFromDB,
  updateSingleProductFromDB,
}
