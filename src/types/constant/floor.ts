import type z from 'zod'

import type { floorCreateSchema, floorUpdateSchema } from '@/constants'

export type FloorCreateSchema = z.infer<typeof floorCreateSchema>
export type FloorUpdateSchema = z.infer<typeof floorUpdateSchema>
