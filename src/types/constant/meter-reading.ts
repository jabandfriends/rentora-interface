import type z from 'zod'

import type { filterMeterReadingFormSchema, meterReadingFormSchema, updateMeterReadingFormSchema } from '@/constants'

export type MeterReadingFormValues = z.infer<typeof meterReadingFormSchema>
export type MeterReadingFilterFormValues = z.infer<typeof filterMeterReadingFormSchema>
export type UpdateMeterReadingFormValues = z.infer<typeof updateMeterReadingFormSchema>
