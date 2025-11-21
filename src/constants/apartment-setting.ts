import z from 'zod'

import { ServiceCategory } from '@/enum'

//schema
export const apartmentMainServiceSchema = z.object({
  serviceName: z.string({ error: 'Service name is required' }).min(1, 'Service name is required'),
  price: z.string({ error: 'Service price is required' }).min(1, 'Service price is required'),
  category: z.enum(ServiceCategory, { error: 'Service category is required' }),
  isActive: z.boolean({ error: 'Service active status is required' }),
})

export const apartmentUtilityFormSchema = z.object({
  waterUtilityId: z.string(),
  waterUtilityType: z.string().optional(),
  waterUtilityUnitPrice: z.string().optional(),
  waterUtilityFixedPrice: z.string().optional(),
  electricUtilityId: z.string(),
  electricUtilityType: z.string().optional(),
  electricUtilityUnitPrice: z.string().optional(),
  electricUtilityFixedPrice: z.string().optional(),
})
