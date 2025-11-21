import type z from 'zod'

import type { apartmentMainServiceSchema, apartmentUtilityFormSchema } from '@/constants'

export type ApartmentMainServiceSchema = z.infer<typeof apartmentMainServiceSchema>
export type ApartmentUtilityFormSchema = z.infer<typeof apartmentUtilityFormSchema>
