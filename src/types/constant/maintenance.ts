import type { z } from 'zod'

import type { MAINTENANCE_FORM_SCHEMA } from '@/constants'
import type { IInputNumberProps } from '@/types'

export type MAINTENANCE_FORM_VALUES = z.infer<typeof MAINTENANCE_FORM_SCHEMA>

type MAINTENANCE_FORM_FIELDS_TYPE_BASE = {
  key: keyof MAINTENANCE_FORM_VALUES
  label?: string
  description?: string
  isRequired?: boolean
}

type MAINTENANCE_FORM_FIELDS_TYPE_INPUT = MAINTENANCE_FORM_FIELDS_TYPE_BASE & {
  fieldType: 'input'
  inputType?: 'text' | 'number' | 'date' | 'datetime' | 'textarea'
} & IInputNumberProps

type MAINTENANCE_FORM_FIELDS_TYPE_SELECT = MAINTENANCE_FORM_FIELDS_TYPE_BASE & {
  fieldType: 'select'
  placeholder?: string
  options: Array<{ value: string; label: string }> // only for select
}

type MAINTENANCE_FORM_FIELDS_TYPE_LAYOUT = MAINTENANCE_FORM_FIELDS_TYPE_BASE & {
  fieldType: 'layout'
  layout: 'row'
  fields: Array<MAINTENANCE_FORM_FIELDS_TYPE>
}

//switch layout
type MAINTENANCE_FORM_FIELDS_TYPE_SWITCH = MAINTENANCE_FORM_FIELDS_TYPE_BASE & {
  fieldType: 'switch'
}

export type MAINTENANCE_FORM_FIELDS_TYPE =
  | MAINTENANCE_FORM_FIELDS_TYPE_INPUT
  | MAINTENANCE_FORM_FIELDS_TYPE_SELECT
  | MAINTENANCE_FORM_FIELDS_TYPE_LAYOUT
  | MAINTENANCE_FORM_FIELDS_TYPE_SWITCH

// type UPDATE_MAINTENANCE_FORM_FIELDS_TYPE_BASE = {
//   key: keyof UPDATE_MAINTENANCE_FORM_SCHEMA_TYPE
//   label?: string
//   description?: string
// }

// type UPDATE_MAINTENANCE_FORM_FIELDS_TYPE_INPUT = UPDATE_MAINTENANCE_FORM_FIELDS_TYPE_BASE & {
//   fieldType: 'input'
//   inputType?: 'text' | 'number' | 'datetime' | 'textarea'
//   type?: HTMLInputTypeAttribute
// } & IInputNumberProps

// type UPDATE_MAINTENANCE_FORM_FIELDS_TYPE_SELECT = UPDATE_MAINTENANCE_FORM_FIELDS_TYPE_BASE & {
//   fieldType: 'select'
//   placeholder?: string
//   options: Array<{ value: string; label: string }> // only for select
// }

// type UPDATE_MAINTENANCE_FORM_FIELDS_TYPE_LAYOUT = UPDATE_MAINTENANCE_FORM_FIELDS_TYPE_BASE & {
//   fieldType: 'layout'
//   layout: 'row'
//   fields: Array<UPDATE_MAINTENANCE_FORM_FIELDS_TYPE>
//   inputType?: 'text' | 'number' | 'datetime' | 'textarea'
// }

// export type UPDATE_MAINTENANCE_FORM_FIELDS_TYPE =
//   | UPDATE_MAINTENANCE_FORM_FIELDS_TYPE_INPUT
//   | UPDATE_MAINTENANCE_FORM_FIELDS_TYPE_SELECT
//   | UPDATE_MAINTENANCE_FORM_FIELDS_TYPE_LAYOUT
