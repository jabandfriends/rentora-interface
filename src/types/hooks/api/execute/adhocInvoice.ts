import type {
  ADHOC_INVOICE_CATEGORY,
  ADHOC_INVOICE_PAYMENT_STATUS,
  ADHOC_INVOICE_PRIORITY,
  ADHOC_INVOICE_STATUS,
} from '@/enum/adhocInvoice'
import type { IBaseUseMutation, IRentoraApiClientBaseResponse } from '@/types'

export type ICreateAdhocInvoiceRequestPayload = {
  unitId: string
  title: string
  description: string
  invoiceDate: string
  dueDate: string
  category: ADHOC_INVOICE_CATEGORY
  finalAmount: number
  paymentStatus: ADHOC_INVOICE_PAYMENT_STATUS
  notes: string
  includeInMonthly: boolean
  priority: ADHOC_INVOICE_PRIORITY
  status: ADHOC_INVOICE_STATUS
}

export type IUpdateAdhocInvoicePayload = {
  invoiceId: string
  title: string
  description: string
  category: ADHOC_INVOICE_CATEGORY
  amount: string
  dueDate: string
  paymentStatus: ADHOC_INVOICE_PAYMENT_STATUS
  invocieStatus: ADHOC_INVOICE_STATUS
  fileName: string
}
export type IUpdateAdhocInvoiceResponse = {
  presignedUrl: string
  invoiceId: string
}
//response
export type IRentoraBaseApiClientUpdateAdhocInvoiceResponse = IRentoraApiClientBaseResponse<IUpdateAdhocInvoicePayload>

//hook
export type IUseRentoraApiUpdateAdhocInvoice = IBaseUseMutation<
  IRentoraBaseApiClientUpdateAdhocInvoiceResponse['data'],
  IUpdateAdhocInvoicePayload
>

export type IUseRentoraApiCreateAdhocInvoice = IBaseUseMutation<
  IRentoraApiClientCreateAdhocInvoiceResponse['data'],
  { apartmentId: string; payload: ICreateAdhocInvoiceRequestPayload }
>

export type IRentoraApiClientCreateAdhocInvoiceResponse = IRentoraApiClientBaseResponse<{
  adhocInvoiceId: string
}>
