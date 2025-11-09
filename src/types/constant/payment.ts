import type z from 'zod'

import type { paymentUpdateFormSchema } from '@/constants'

export type PaymentUpdateFormValues = z.infer<typeof paymentUpdateFormSchema>
