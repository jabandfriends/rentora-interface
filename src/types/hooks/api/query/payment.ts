import type { PaymentStatus, VerifiedStatus } from '@/enum'
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
  paymentMethod: string
  paymentStatus: string //enum
  verificationStatus: string //enum
  amount: number
  tenantName: string
  unitName: string
  buildingName: string
  floorName: string
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
}
//hook
export type IUseRentoraApiPaymentListStatus = IBasePaginateQueryResult<IRentoraApiClientPaymentListResponse['data']>
