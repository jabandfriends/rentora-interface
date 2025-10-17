import type { ReactNode } from 'react'
import type { z } from 'zod'

import type { apartmentInformationFormSchema } from '@/constants'

export type TTabApartmentSetting = {
  value: string
  label: string
  icon: ReactNode
}

export type ApartmentInformationFormSchema = z.infer<typeof apartmentInformationFormSchema>
