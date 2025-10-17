import type z from 'zod'

import type { filterFormSchema } from '@/constants'

export type FilterFormType = z.infer<typeof filterFormSchema>
