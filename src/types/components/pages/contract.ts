import type z from 'zod'

import type { MONTHLY_CONTRACT_SCHEMA } from '@/constants'

export type MonthlyContractFormData = z.infer<typeof MONTHLY_CONTRACT_SCHEMA>
