import { Schema, model } from 'mongoose'
import { Inventory, Product, Variant } from './product/product.interface'

const variantSchema = new Schema<Variant>({
  type: {
    type: String,
    required: [true, 'Variant type is required'],
    trim: true,
  },
  value: {
    type: String,
    required: [true, 'Variant value is required'],
    trim: true,
  },
})

const inventorySchema = new Schema<Inventory>({
  quantity: {
    type: Number,
    required: [true, 'Inventory quantity is required'],
    min: [0, 'Quantity cannot be negative'],
  },
  inStock: {
    type: Boolean,
    required: [true, 'In-stock status is required'],
  },
})

const productSchema = new Schema<Product>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative'],
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    trim: true,
  },
  tags: {
    type: [String],
    validate: {
      validator: function (value: string[]) {
        return value.every(
          (tag) => typeof tag === 'string' && tag.trim().length > 0,
        )
      },
      message: 'Tags must be non-empty strings',
    },
  },
  variants: {
    type: [variantSchema],
    validate: {
      validator: function (value: Variant[]) {
        return value.length > 0
      },
      message: 'At least one variant is required',
    },
  },
  inventory: {
    type: inventorySchema,
    required: [true, 'Inventory information is required'],
  },
})

export const ProductModel = model<Product>('Product', productSchema)
