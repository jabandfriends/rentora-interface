import type { MonthlyInvoicePaymentStatus, PaymentStatus, VerifiedStatus } from '@/enum'
import type { IBasePaginateQueryResult, IRentoraApiClientBasePaginateWithMetadataResponse } from '@/types'

export type IUseRentoraApiPaymentList = IBasePaginateQueryResult<IRentoraApiClientPaymentListResponse['data']>
export type IRentoraApiClientPaymentListResponse = IRentoraApiClientBasePaginateWithMetadataResponse<
  IPayment,
  IPaymentListMetadata
>

export type IPaymentListMetadata = {
  totalPayments: number
  totalPaymentsComplete: number
  totalPaymentsPending: number
  totalPaymentsFailed: number
}

export type IPayment = {
  paymentId: string
  paymentNumber: string
  paymentMethod: string
  invoiceStatus: MonthlyInvoicePaymentStatus
  invoiceNumber: string
  paymentStatus: PaymentStatus
  verificationStatus: VerifiedStatus
  amount: number
  tenantName: string
  unitName: string
  buildingName: string
  floorName: string
  receiptUrl: string
}

//param
export type IRentoraApiPaymentListParams = {
  page: number
  size: number
  search?: string
  sortBy?: string
  sortDir?: string
  status?: PaymentStatus
  buildingName?: string
  verifiedStatus?: VerifiedStatus
  genMonth?: string
}

//hook
export type IUseRentoraApiPaymentListStatus = IBasePaginateQueryResult<IRentoraApiClientPaymentListResponse['data']>
