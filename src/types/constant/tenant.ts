import type { IInputNumberProps } from '@/types'

type TENANT_FORM_FIELDS_TYPE_BASE = {
  key:
    | 'full_name'
    | 'first_name'
    | 'last_name'
    | 'email'
    | 'password'
    | 'confirm_password'
    | 'phone'
    | 'national_id'
    | 'birth_date'
    | 'floor'
    | 'room'
  label?: string
  description?: string
}
type TENANT_FORM_FIELDS_TYPE_INPUT = TENANT_FORM_FIELDS_TYPE_BASE & {
  fieldType: 'input'
  inputType?: 'text' | 'number' | 'date' | 'datetime' | 'textarea'
} & IInputNumberProps

type TENANT_FORM_FIELDS_TYPE_SELECT = TENANT_FORM_FIELDS_TYPE_BASE & {
  fieldType: 'select'
  placeholder?: string
  options: Array<{ value: string; label: string }> // only for select
}

type TENANT_FORM_FIELDS_TYPE_LAYOUT = TENANT_FORM_FIELDS_TYPE_BASE & {
  fieldType: 'layout'
  layout: 'row'
  fields: Array<TENANT_FORM_FIELDS_TYPE>
  inputType?: 'text' | 'number' | 'date' | 'datetime' | 'textarea'
}

export type TENANT_FORM_FIELDS_TYPE =
  | TENANT_FORM_FIELDS_TYPE_INPUT
  | TENANT_FORM_FIELDS_TYPE_SELECT
  | TENANT_FORM_FIELDS_TYPE_LAYOUT
