import { z } from 'zod'

// Define the Validationschema for Variant
const variantValidationSchema = z.object({
  type: z.string().min(1, { message: 'Variant type is required' }).trim(),
  value: z.string().min(1, { message: 'Variant value is required' }).trim(),
})

// Define the Validationschema for Inventory
const inventoryValidationSchema = z.object({
  quantity: z
    .number({ required_error: 'Inventory quantity is required' })
    .min(0, { message: 'Quantity cannot be negative' }),
  inStock: z.boolean({ required_error: 'In-stock status is required' }),
})

// Define the Validationschema for Product
const productValidationSchema = z.object({
  name: z
    .string({ required_error: 'Product name is required' })
    .max(100, { message: 'Product name cannot exceed 100 characters' })
    .trim(),
  description: z
    .string({ required_error: 'Product description is required' })
    .trim(),
  price: z
    .number({ required_error: 'Product price is required' })
    .min(0, { message: 'Price cannot be negative' }),
  category: z.string({ required_error: 'Product category is required' }).trim(),
  tags: z
    .array(z.string().min(1, { message: 'Tags must be non-empty strings' }))
    .min(1, { message: 'At least one tag is required' }),
  variants: z
    .array(variantValidationSchema)
    .min(1, { message: 'At least one variant is required' }),
  inventory: inventoryValidationSchema,
})

export default productValidationSchema
