import type z from 'zod'

import type { contractUpdateFormSchema } from '@/constants/contract'

export type ContractUpdateFormValues = z.infer<typeof contractUpdateFormSchema>
