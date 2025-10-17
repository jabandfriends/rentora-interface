import { z } from 'zod'

export const createBuildingSchema = z.object({
  name: z.string().min(1, 'Building name is required').max(50, 'Building name must be at most 50 characters long'),
  description: z.string().max(255, 'Description must be at most 255 characters long').optional(),
  totalFloor: z.number().min(1, 'Total floor is required').max(100, 'Total floor must be at most 100'),
})

export const updateBuildingSchema = z.object({
  name: z.string().max(50, 'Building name must be at most 50 characters long').optional(),
  description: z.string().max(255, 'Description must be at most 255 characters long').optional(),
  totalFloor: z.number().min(1, 'Total floor is required').max(100, 'Total floor must be at most 100').optional(),
})
