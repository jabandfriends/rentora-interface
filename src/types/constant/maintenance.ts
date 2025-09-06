import type { IInputNumberProps } from '@/types'

type MAINTENANCE_FORM_FIELDS_TYPE_BASE = {
  key: string
  label?: string
  description?: string
}
type MAINTENANCE_FORM_FIELDS_TYPE_INPUT = MAINTENANCE_FORM_FIELDS_TYPE_BASE & {
  fieldType: 'input'
  inputType?: 'text' | 'number' | 'date' | 'datetime' | 'textarea'
} & IInputNumberProps

type MAINTENANCE_FORM_FIELDS_TYPE_SELECT = MAINTENANCE_FORM_FIELDS_TYPE_BASE & {
  fieldType: 'select'
  options: Array<{ value: string; label: string }> // only for select
}

type MAINTENANCE_FORM_FIELDS_TYPE_LAYOUT = MAINTENANCE_FORM_FIELDS_TYPE_BASE & {
  fieldType: 'layout'
  layout: 'row'
  fields: Array<MAINTENANCE_FORM_FIELDS_TYPE>
}

export type MAINTENANCE_FORM_FIELDS_TYPE =
  | MAINTENANCE_FORM_FIELDS_TYPE_INPUT
  | MAINTENANCE_FORM_FIELDS_TYPE_SELECT
  | MAINTENANCE_FORM_FIELDS_TYPE_LAYOUT
