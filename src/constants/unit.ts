import { z } from 'zod'

import { UnitStatus } from '@/enum'

export const unitCreateFormSchema = z.object({
  unitName: z.string().min(1, 'Unit name is required'),
  bedrooms: z.number({ error: 'Bedrooms is required' }),
  bathrooms: z.number({ error: 'Bathrooms is required' }),
  squareMeters: z.number().min(1, 'Square meters is required'),
  balconyCount: z.number({ error: 'Balcony count is required' }),
  parkingCount: z.number({ error: 'Parking count is required' }),
})

export const unitUpdateFormSchema = z.object({
  unitName: z.string().min(1, 'Unit name is required'),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  squareMeters: z.number(),
  balconyCount: z.number().optional(),
  parkingCount: z.number().optional(),
  status: z.enum([UnitStatus.available, UnitStatus.occupied, UnitStatus.maintenance]),
})
