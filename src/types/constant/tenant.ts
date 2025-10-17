import type { HTMLInputTypeAttribute } from 'react'

import type { CREATE_TENANT_FORM_SCHEMA_TYPE, IInputNumberProps, UPDATE_TENANT_FORM_SCHEMA_TYPE } from '@/types'

type UPDATE_TENANT_FORM_FIELDS_TYPE_BASE = {
  key: keyof UPDATE_TENANT_FORM_SCHEMA_TYPE
  label?: string
  description?: string
}

export type UPDATE_TENANT_FORM_FIELDS_PASSWORD_UPDATE_TYPE_BASE = {
  fieldType: 'input'
  key: 'password' | 'confirmPassword'
  label?: string
  description?: string
  inputType?: 'text'
  placeholder?: string
}

type UPDATE_TENANT_FORM_FIELDS_TYPE_INPUT = UPDATE_TENANT_FORM_FIELDS_TYPE_BASE & {
  fieldType: 'input'
  inputType?: 'text' | 'number' | 'date' | 'datetime' | 'textarea' | 'date'
  type?: HTMLInputTypeAttribute
} & IInputNumberProps

type UPDATE_TENANT_FORM_FIELDS_TYPE_SELECT = UPDATE_TENANT_FORM_FIELDS_TYPE_BASE & {
  fieldType: 'select'
  placeholder?: string
  options: Array<{ value: string; label: string }> // only for select
}

type UPDATE_TENANT_FORM_FIELDS_TYPE_LAYOUT = UPDATE_TENANT_FORM_FIELDS_TYPE_BASE & {
  fieldType: 'layout'
  layout: 'row'
  fields: Array<UPDATE_TENANT_FORM_FIELDS_TYPE>
  inputType?: 'text' | 'number' | 'date' | 'datetime' | 'textarea'
}

type CREATE_TENANT_FORM_FIELDS_TYPE_BASE = {
  key: keyof CREATE_TENANT_FORM_SCHEMA_TYPE
  label?: string
  description?: string
}

type CREATE_TENANT_FORM_FIELDS_TYPE_INPUT = CREATE_TENANT_FORM_FIELDS_TYPE_BASE & {
  fieldType: 'input'
  inputType?: 'text' | 'number' | 'date' | 'datetime' | 'textarea' | 'date'
  type?: HTMLInputTypeAttribute
} & IInputNumberProps

type CREATE_TENANT_FORM_FIELDS_TYPE_SELECT = CREATE_TENANT_FORM_FIELDS_TYPE_BASE & {
  fieldType: 'select'
  placeholder?: string
  options: Array<{ value: string; label: string }> // only for select
}

type CREATE_TENANT_FORM_FIELDS_TYPE_LAYOUT = CREATE_TENANT_FORM_FIELDS_TYPE_BASE & {
  fieldType: 'layout'
  layout: 'row'
  fields: Array<CREATE_TENANT_FORM_FIELDS_TYPE>
  inputType?: 'text' | 'number' | 'date' | 'datetime' | 'textarea'
}

export type UPDATE_TENANT_FORM_FIELDS_TYPE =
  | UPDATE_TENANT_FORM_FIELDS_TYPE_INPUT
  | UPDATE_TENANT_FORM_FIELDS_TYPE_SELECT
  | UPDATE_TENANT_FORM_FIELDS_TYPE_LAYOUT

export type CREATE_TENANT_FORM_FIELDS_TYPE =
  | CREATE_TENANT_FORM_FIELDS_TYPE_INPUT
  | CREATE_TENANT_FORM_FIELDS_TYPE_SELECT
  | CREATE_TENANT_FORM_FIELDS_TYPE_LAYOUT
