import { ProductModel } from '../product.model'
import { Product } from './product.interface'

const createProductIntoDB = async (productData: Product) => {
  // const result = await productModel.create(product)

  const product = new ProductModel(productData)
  const result = await product.save()
  return result
}

const getAllProductsFromDB = async () => {
  const result = await ProductModel.find()
  return result
}

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ id })
  return result
}

const deleteSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.updateOne({ id }, { isDeleted: true })
  return result
}

const updateSingleProductFromDB = async (id: string, product: Product) => {
  const result = await ProductModel.updateOne({ id }, product)
  return result
}

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteSingleProductFromDB,
  updateSingleProductFromDB,
}