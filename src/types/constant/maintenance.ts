import type { HTMLInputTypeAttribute } from 'react'

import type { IInputNumberProps, UPDATE_MAINTENANCE_FORM_SCHEMA_TYPE } from '@/types'

type MAINTENANCE_FORM_FIELDS_TYPE_BASE = {
  key: 'unit_id' | 'title' | 'description' | 'status' | 'priority' | 'appointment_date' | 'due_date' | 'estimated_hours'
  label?: string
  description?: string
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

export type MAINTENANCE_FORM_FIELDS_TYPE =
  | MAINTENANCE_FORM_FIELDS_TYPE_INPUT
  | MAINTENANCE_FORM_FIELDS_TYPE_SELECT
  | MAINTENANCE_FORM_FIELDS_TYPE_LAYOUT

type UPDATE_MAINTENANCE_FORM_FIELDS_TYPE_BASE = {
  key: keyof UPDATE_MAINTENANCE_FORM_SCHEMA_TYPE
  label?: string
  description?: string
}

type UPDATE_MAINTENANCE_FORM_FIELDS_TYPE_INPUT = UPDATE_MAINTENANCE_FORM_FIELDS_TYPE_BASE & {
  fieldType: 'input'
  inputType?: 'text' | 'number' | 'datetime' | 'textarea'
  type?: HTMLInputTypeAttribute
} & IInputNumberProps

type UPDATE_MAINTENANCE_FORM_FIELDS_TYPE_SELECT = UPDATE_MAINTENANCE_FORM_FIELDS_TYPE_BASE & {
  fieldType: 'select'
  placeholder?: string
  options: Array<{ value: string; label: string }> // only for select
}

type UPDATE_MAINTENANCE_FORM_FIELDS_TYPE_LAYOUT = UPDATE_MAINTENANCE_FORM_FIELDS_TYPE_BASE & {
  fieldType: 'layout'
  layout: 'row'
  fields: Array<UPDATE_MAINTENANCE_FORM_FIELDS_TYPE>
  inputType?: 'text' | 'number' | 'datetime' | 'textarea'
}

export type UPDATE_MAINTENANCE_FORM_FIELDS_TYPE =
  | UPDATE_MAINTENANCE_FORM_FIELDS_TYPE_INPUT
  | UPDATE_MAINTENANCE_FORM_FIELDS_TYPE_SELECT
  | UPDATE_MAINTENANCE_FORM_FIELDS_TYPE_LAYOUT
