import type { CONTRACT_RENTAL_TYPE, CONTRACT_STATUS } from '@/enum'
import type {
  IBasePaginateQueryResult,
  IBaseUseMutation,
  IBaseUseQuery,
  IRentoraApiClientBasePaginateResponse,
  IRentoraApiClientBaseResponse,
  Maybe,
} from '@/types'

export type IContract = {
  contractId: string
  contractNumber: string
  unitName: string
  buildingName: string
  apartmentName: string
  tenantName: string
  tenantEmail: string
  tenantPhone: string
  rentalType: CONTRACT_RENTAL_TYPE
  startDate: string
  endDate: string
  rentalPrice: number
  depositAmount: number
  advancePaymentMonths: number
  lateFeeAmount: number
  utilitiesIncluded: boolean
  termsAndConditions: string
  specialConditions: string
  status: CONTRACT_STATUS
  autoRenewal: boolean
  renewalNoticeDays: number
  terminationDate: null
  terminationReason: null
  terminatedByUserName: null
  documentUrl: string
  signedAt: null
  createdByUserName: string
  createdAt: string
  updatedAt: string
  waterMeterStart: number
  electricMeterStart: number
  daysUntilExpiry: number
  contractDurationDays: number
}

//hook
export type IUseRentoraApiContractDetail = IBaseUseQuery<IRentoraApiClientContractDetailResponse['data']>
//reponse
export type IRentoraApiClientContractDetailResponse = IRentoraApiClientBaseResponse<Maybe<IContract>>

export type IContractSummary = {
  id: string
  contractNumber: string
  unitName: string
  buildingName: string
  apartmentName: string
  tenantName: string
  tenantEmail: string
  rentalType: CONTRACT_RENTAL_TYPE
  startDate: string
  endDate: string
  rentalPrice: number
  status: CONTRACT_STATUS
  createdAt: string

  // Additional summary info
  isExpiringSoon: boolean // within 30 days
  daysUntilExpiry: number
  totalDeposit: number
}

export type IRentoraApiContractListParams = {
  page?: number
  size?: number
  sortBy?: string
  sortDir?: string
  contractStatus?: CONTRACT_STATUS
  unitId?: string
}
//response
export type IRentoraApiClientContractListResponse = IRentoraApiClientBasePaginateResponse<IContractSummary>

//hook
export type IUseRentoraApiContractList = IBasePaginateQueryResult<IRentoraApiClientContractListResponse['data']>

export type ITerminateContractRequestPayload = {
  terminationReason: string
}

export type IUseRentoraApiContractTerminate = IBaseUseMutation<void, ITerminateContractRequestPayload>

//param
export type IUseRentoraApiContractTerminateParams = {
  apartmentId?: string
  unitId?: string
}
