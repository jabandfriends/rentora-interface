import type z from 'zod'

import type { supplyCreateFormSchema, supplyUpdateFormSchema } from '@/constants'

export type ISupplyCreateFormSchema = z.infer<typeof supplyCreateFormSchema>
export type ISupplyUpdateFormSchema = z.infer<typeof supplyUpdateFormSchema>
