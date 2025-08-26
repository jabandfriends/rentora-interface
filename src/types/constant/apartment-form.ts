import type { ReactNode } from 'react'
import type z from 'zod'

import type { APARTMENT_FORM_SCHEMA } from '@/constants'
import type { IInputProps } from '@/types'

export type APARTMENT_FORM_VALUES = z.infer<typeof APARTMENT_FORM_SCHEMA>

export type APARTMENT_FORM_FIELD_KEY = 'name' | 'address' | 'phone' | 'taxId' | 'paymentDueDate' | 'lateFee'

export type FORM_SECTION<T> = {
  icon?: ReactNode
  title: string
  description?: string
  fields: Array<T>
}

export type APARTMENT_FORM_FIELD = {
  key: APARTMENT_FORM_FIELD_KEY
  label: string
  description?: string
  icon?: ReactNode
} & IInputProps
