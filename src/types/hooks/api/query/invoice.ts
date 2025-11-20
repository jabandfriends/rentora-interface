import type {
  IBasePaginateQueryResult,
  IBaseUseQuery,
  IRentoraApiClientBasePaginateResponse,
  IRentoraApiClientBasePaginateWithMetadataResponse,
  IRentoraApiClientBaseResponse,
} from '@/types'

export type IInvoiceListMetadata = {
  totalInvoice: number
  paidInvoice: number
  unpaidInvoice: number
  partiallyPaidInvoice: number
  overdueInvoice: number
  cancelledInvoice: number
}

export type IOverdueInvoiceListMetadata = {
  overdueInvoice: number
}

export type IInvoiceSummary = {
  id: string
  invoiceNumber: string
  title: string
  description: string
  tenant: string
  room: string
  amount: number
  issueDate: string
  dueDate: string
  status: invoiceStatus
}

export type IOverdueInvoice = {
  id: string
  invoiceNumber: string
  tenant: string
  room: string
  amount: number
  issueDate: string
  dueDate: string
  status: 'overdue'
}

export type invoiceStatus = 'paid' | 'unpaid' | 'partially_paid' | 'overdue' | 'cancelled'

export type IInvoiceDetail = {
  adhocInvoiceId: string
  adhocNumber: string
  title: string
  description: string
  paymentStatus: string
  status: string
  priority: string
  category: string
  finalAmount: number
  paidAmount: number
  invoiceDate: string
  dueDate: string
  apartment: string
  unit: string
  tenantUser: string
  email: string
  receiptUrls: string
  images: string
  notes: string
  createdByUserId: string
  createdAt: string
  updatedAt: string
}

export type IUseRentoraApiInvoiceList = IBasePaginateQueryResult<IRentoraApiClientInvoiceListResponse['data']>

export type IUseRentoraApiOverdueInvoiceList = IBasePaginateQueryResult<
  IRentoraApiClientOverdueInvoiceListResponse['data']
>

export type IRentoraApiClientInvoiceListResponse = IRentoraApiClientBasePaginateWithMetadataResponse<
  IInvoiceSummary,
  IInvoiceListMetadata
>

export type IRentoraApiInvoiceListParams = {
  page?: number
  size?: number
  search?: string
  status?: string
  name?: string
  sortBy?: 'name' | 'createdAt' | 'updatedAt'
  sortDir?: 'asc' | 'desc'
}

export type IRentoraApiOverdueInvoiceListParams = {
  page?: number
  size?: number
  search?: string
  name?: string
  sortBy?: 'name' | 'createdAt' | 'updatedAt'
  sortDir?: 'asc' | 'desc'
}

export type IUseRentoraApiInvoiceDetail = IBaseUseQuery<IRentoraApiClientInvoiceDetailResponse['data']>

export type IRentoraApiClientInvoiceDetailResponse = IRentoraApiClientBaseResponse<IInvoiceDetail>

export type IRentoraApiClientOverdueInvoiceListResponse = IRentoraApiClientBasePaginateWithMetadataResponse<
  IOverdueInvoice,
  IOverdueInvoiceListMetadata
>

export type IRentoraApiInvoiceDetailParams = {
  invoiceId: string
}

//Tenant adhoc invoice list params
export type IRentoraApiTenantAdhocInvoiceListParams = {
  page?: number
  size?: number
  sortBy?: string
  sortDir?: string
  status?: string
  category?: string
}

//Tenant adhoc invoice list response
export type IRentoraApiClientTenantAdhocInvoiceListResponse = IRentoraApiClientBasePaginateResponse<IInvoiceSummary>

//hooks type useRentoraApiTenantAdhocInvoiceList
export type IUseRentoraApiTenantAdhocInvoiceList = IBasePaginateQueryResult<
  IRentoraApiClientTenantAdhocInvoiceListResponse['data']
>
