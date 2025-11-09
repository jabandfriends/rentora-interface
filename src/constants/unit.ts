import { z } from 'zod'

import { UnitStatus } from '@/enum'

export const unitCreateFormSchema = z.object({
  unitName: z.string().min(1, 'Unit name is required'),
})

export const unitUpdateFormSchema = z.object({
  unitName: z.string().min(1, 'Unit name is required'),
  status: z.enum(UnitStatus),
})
