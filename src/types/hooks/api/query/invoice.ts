import type {
  IBasePaginateQueryResult,
  IBaseUseQuery,
  IRentoraApiClientBasePaginateWithMetadataResponse,
  IRentoraApiClientBaseResponse,
  Maybe,
} from '@/types'

export type IInvoiceListMetadata = {
  totalInvoice: number
  paidInvoice: number
  unpaidInvoice: number
  partiallyPaidInvoice: number
  overdueInvoice: number
  cancelledInvoice: number
}

export type IInvoiceSummary = {
  invoiceId: string
  invoiceNumber: string
  tenant: string
  room: string
  amount: number
  issueDate: string
  dueDate: string
  status: invoiceStatus
}

export type invoiceStatus = 'paid' | 'unpaid' | 'partially_paid' | 'overdue' | 'cancelled'

export type IInvoiceDetail = IInvoiceSummary & {
  contact: string
  rentalAmount: number
  utilAmount: number
  serviceAmount: number
  feesAmount: number
  discountAmount: number
  taxAmount: number
  apartmentName: string
  unit: string
  email: string
  pdf: Maybe<string>
  notes: Maybe<string>
  createdAt: string
  updatedAt: string
}

export type IUseRentoraApiInvoiceList = IBasePaginateQueryResult<IRentoraApiClientInvoiceListResponse['data']>

export type IRentoraApiClientInvoiceListResponse = IRentoraApiClientBasePaginateWithMetadataResponse<
  IInvoiceSummary,
  IInvoiceListMetadata
>

export type IRentoraApiInvoiceListParams = {
  page?: number
  size?: number
  search?: string
  sortBy?: 'name' | 'createdAt' | 'updatedAt'
  sortDir?: 'asc' | 'desc'
}

export type IUseRentoraApiInvoiceDetail = IBaseUseQuery<IRentoraApiClientInvoiceDetailResponse['data']>

export type IRentoraApiClientInvoiceDetailResponse = IRentoraApiClientBaseResponse<IInvoiceDetail>

export type IRentoraApiOverdueListParams = {
  overdueInvoice: number
}
