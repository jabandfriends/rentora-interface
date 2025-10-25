import type z from 'zod'

import type { supplyCreateFormSchema } from '@/constants'

export type ISupplyCreateFormSchema = z.infer<typeof supplyCreateFormSchema>
