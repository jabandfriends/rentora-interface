import type { IBaseUseMutation } from '@/types'

export type IGenerateMonthlyInvoiceRequestPayload = {
  unitId: string
  readingDate: string
}

//hook
export type IUseGenerateMonthlyInvoice = IBaseUseMutation<void, IGenerateMonthlyInvoiceRequestPayload>
