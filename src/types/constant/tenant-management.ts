import type { IInputNumberProps } from '@/types'

type TENANT_FORM_FIELDS_TYPE_BASE = {
  key: 'firstname' | 'lastname' | 'email' | 'phone' | 'id' | 'birthdate' | 'floor' | 'room' | 'name'
  label?: string
  description?: string
}

type TENANT_FORM_FIELDS_TYPE_LAYOUT = TENANT_FORM_FIELDS_TYPE_BASE & {
  fieldType: 'layout'
  layout: 'row'
  fields: Array<TENANT_FORM_FIELDS_TYPE>
}

type TENANT_FORM_FIELDS_TYPE_INPUT = TENANT_FORM_FIELDS_TYPE_BASE & {
  fieldType: 'input'
  inputType?: 'text' | 'datetime' | 'number' | 'email'
} & IInputNumberProps

export type TENANT_FORM_FIELDS_TYPE = TENANT_FORM_FIELDS_TYPE_INPUT | TENANT_FORM_FIELDS_TYPE_LAYOUT
