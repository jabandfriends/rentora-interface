import type z from 'zod'

import type { filterMeterReadingFormSchema, meterReadingFormSchema } from '@/constants'

export type MeterReadingFormValues = z.infer<typeof meterReadingFormSchema>
export type MeterReadingFilterFormValues = z.infer<typeof filterMeterReadingFormSchema>
