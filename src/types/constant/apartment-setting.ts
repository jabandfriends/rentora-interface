import type z from 'zod'

import type { apartmentMainServiceSchema } from '@/constants'

export type ApartmentMainServiceSchema = z.infer<typeof apartmentMainServiceSchema>
