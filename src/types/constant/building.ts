import z from 'zod'

import type { createBuildingSchema, updateBuildingSchema } from '@/constants'

export type CreateBuildingSchema = z.infer<typeof createBuildingSchema>
export type UpdateBuildingSchema = z.infer<typeof updateBuildingSchema>
