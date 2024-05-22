import { z } from 'zod'

// Define the Zod schema to match the Mongoose schema
const OrderValidateSchema = z.object({
  email: z.string().trim().nonempty(),
  productId: z.string().trim().nonempty(),
  price: z.number().min(0),
  quantity: z.number().min(1),
})

export default OrderValidateSchema
