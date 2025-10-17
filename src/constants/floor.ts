import { z } from 'zod'

export const floorCreateSchema = z.object({
  floorName: z.string().min(1, 'Floor name is required'),
  floorNumber: z.number().min(1, 'Floor number is required'),
  totalUnits: z.number().min(1, 'Total units is required'),
})

export const floorUpdateSchema = z.object({
  floorName: z.string().optional(),
  floorNumber: z.number().optional(),
  totalUnits: z.number().optional(),
})
