import type z from 'zod'

import type { AdhocInvoiceSchema } from '@/constants'
import type { IInputNumberProps } from '@/types'

// TypeScript type
export type AdhocInvoice = z.infer<typeof AdhocInvoiceSchema>

type INVOICE_FORM_FIELDS_TYPE_BASE = {
  key: keyof AdhocInvoice
  label?: string
  description?: string
}
type INVOICE_FORM_FIELDS_TYPE_INPUT = INVOICE_FORM_FIELDS_TYPE_BASE & {
  fieldType: 'input'
  inputType?: 'text' | 'number' | 'date' | 'datetime' | 'textarea'
} & IInputNumberProps

type INVOICE_FORM_FIELDS_TYPE_SELECT = INVOICE_FORM_FIELDS_TYPE_BASE & {
  fieldType: 'select'
  placeholder?: string
  options: Array<{ value: string | boolean | number; label: string }> // only for select
}

type INVOICE_FORM_FIELDS_TYPE_LAYOUT = INVOICE_FORM_FIELDS_TYPE_BASE & {
  fieldType: 'layout'
  layout: 'row'
  fields: Array<INVOICE_FORM_FIELDS_TYPE>
  inputType?: 'text' | 'number' | 'date' | 'datetime' | 'textarea'
}

export type INVOICE_FORM_FIELDS_TYPE =
  | INVOICE_FORM_FIELDS_TYPE_INPUT
  | INVOICE_FORM_FIELDS_TYPE_SELECT
  | INVOICE_FORM_FIELDS_TYPE_LAYOUT
