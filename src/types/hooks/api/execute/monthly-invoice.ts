import type { IBaseUseMutation } from '@/types'

export type IGenerateMonthlyInvoiceRequestPayload = {
  unitId: string
  readingDate: string
  paymentDueDay: number
}

//hook
export type IUseGenerateMonthlyInvoice = IBaseUseMutation<void, IGenerateMonthlyInvoiceRequestPayload>
