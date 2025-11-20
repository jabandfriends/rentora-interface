import type { HTMLInputTypeAttribute } from 'react'
import type z from 'zod'

import type { USER_FORM_SCHEMA } from '@/constants/user'

import type { IInputNumberProps } from '../components'

export type USER_FORM_VALUES = z.infer<typeof USER_FORM_SCHEMA>

type USER_FORM_FIELDS_TYPE_BASE = {
  key: keyof USER_FORM_VALUES
  label?: string
  description?: string
  isRequired?: boolean
}

type USER_FORM_FIELDS_TYPE_INPUT = USER_FORM_FIELDS_TYPE_BASE & {
  fieldType: 'input'
  inputType?: 'text' | 'number' | 'date' | 'datetime' | 'textarea'
  type?: HTMLInputTypeAttribute
} & IInputNumberProps

type USER_FORM_FIELDS_TYPE_SELECT = USER_FORM_FIELDS_TYPE_BASE & {
  fieldType: 'select'
  placeholder?: string
  options: Array<{ value: string; label: string }>
}

type USER_FORM_FIELDS_TYPE_LAYOUT = USER_FORM_FIELDS_TYPE_BASE & {
  fieldType: 'layout'
  layout: 'row'
  fields: Array<USER_FORM_FIELDS_TYPE>
}

type USER_FORM_FIELDS_TYPE_SWITCH = USER_FORM_FIELDS_TYPE_BASE & {
  fieldType: 'switch'
}

export type USER_FORM_FIELDS_TYPE =
  | USER_FORM_FIELDS_TYPE_INPUT
  | USER_FORM_FIELDS_TYPE_SELECT
  | USER_FORM_FIELDS_TYPE_LAYOUT
  | USER_FORM_FIELDS_TYPE_SWITCH
