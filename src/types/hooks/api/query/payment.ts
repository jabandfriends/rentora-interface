import type { MonthlyInvoicePaymentStatus, PaymentStatus, VerifiedStatus } from '@/enum'
import type {
  IBasePaginateQueryResult,
  IRentoraApiClientBasePaginateResponse,
  IRentoraApiClientBasePaginateWithMetadataResponse,
} from '@/types'

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

export type ITenantPayment = {
  paymentId: string
  invoiceNumber: string
  paymentDueDate: string
  paymentStatus: PaymentStatus
  verificationStatus: VerifiedStatus
  paymentReceiptUrl: string
  paymentAmount: number
  paidDate: string
}

export type ITenantApartmentParams = {
  page: number
  size: number
  paymentStatus?: PaymentStatus
  verificationStatus?: VerifiedStatus
}

//response
export type IRentoraApiClientTenantPaymentResponse = IRentoraApiClientBasePaginateResponse<ITenantPayment>
export type IUseRentoraApiTenantPayments = IBasePaginateQueryResult<IRentoraApiClientTenantPaymentResponse['data']>

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
