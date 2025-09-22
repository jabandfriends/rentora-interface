import type { ReactNode } from 'react'
import type z from 'zod'

import type { APARTMENT_FORM_SCHEMA } from '@/constants'
import type { IInputNumberProps, IInputProps } from '@/types'

export type APARTMENT_FORM_VALUES = z.infer<typeof APARTMENT_FORM_SCHEMA>

export type APARTMENT_FORM_FIELD_KEY =
  | 'name'
  | 'address'
  | 'phoneNumber'
  | 'taxId'
  | 'paymentDueDay'
  | 'lateFee'
  | 'lateFeeType'
  | 'gracePeriodDays'
  | 'city'
  | 'state'
  | 'postalCode'
  | 'country'

export type APARTMENT_FORM_FIELD = {
  key: APARTMENT_FORM_FIELD_KEY
  label: string
  description?: string
  icon?: ReactNode
  type?: string
  options?: Array<{ label: string; value: string }>
} & IInputProps &
  IInputNumberProps
