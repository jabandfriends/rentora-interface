import type z from 'zod'

import type { unitCreateFormSchema, unitUpdateFormSchema } from '@/constants'

export type UnitCreateFormSchema = z.infer<typeof unitCreateFormSchema>
export type UnitUpdateFormSchema = z.infer<typeof unitUpdateFormSchema>
