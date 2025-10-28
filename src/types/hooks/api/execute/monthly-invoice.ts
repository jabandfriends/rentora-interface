import type { IBaseUseMutation, IRentoraApiClientBaseResponse } from '@/types'

export type IGenerateMonthlyInvoiceRequestPayload = {
  unitId: string
  readingDate: string
  paymentDueDay: number
}

//hook
export type IUseGenerateMonthlyInvoice = IBaseUseMutation<void, IGenerateMonthlyInvoiceRequestPayload>

export type IPutPresignedUrlPDFRequest = {
  presignedUrl: string
  pdfFile: File
}

export type IUpdateMonthlyInvoiceRequest = IRentoraApiClientBaseResponse<{
  uploadUrl: string
  fileKey: string
}>

export type IUseMonthlyInvoiceRequestPayload = IBaseUseMutation<void, { invoiceNumber: string; file: File }>
