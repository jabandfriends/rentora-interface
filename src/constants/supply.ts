import z from 'zod'

import { SupplyCategory } from '@/enum'

export const supplyCreateFormSchema = z.object({
  name: z.string({ error: 'Name is required' }).min(1, 'Name is required'),
  category: z.enum(SupplyCategory, { error: 'Category is required' }),
  description: z.string().optional(),
  unit: z.string({ error: 'Unit is required' }).min(1, 'Unit is required'),
  stockQuantity: z.string({ error: 'Stock quantity is required' }).min(1, 'Stock quantity is required'),
  minStock: z.string({ error: 'Min stock is required' }).min(1, 'Min stock is required'),
  costPerUnit: z.string({ error: 'Cost per unit is required' }).min(1, 'Cost per unit is required'),
})

export const supplyUpdateFormSchema = supplyCreateFormSchema
