import z from 'zod'

import type { AdhocInvoiceSchema } from '@/constants'

export type ADHOC_INVOICE_FORM_SCHEMA_TYPE = z.infer<typeof AdhocInvoiceSchema>

export type IAdhocInvoiceFormProps = {
  onSubmit: (data: ADHOC_INVOICE_FORM_SCHEMA_TYPE) => void
  buttonLabel: string
  buttonIcon?: React.ReactNode
}
