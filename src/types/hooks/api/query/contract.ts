import type { CONTRACT_RENTAL_TYPE, CONTRACT_STATUS } from '@/enum'
import type { IBaseUseQuery, IRentoraApiClientBaseResponse } from '@/types'

export type IContract = {
  contractId: string
  contractNumber: string
  unitName: string
  buildingName: string
  apartmentName: string
  tenantName: string
  tenantEmail: string
  tenantPhone: string
  guarantorName: string
  guarantorPhone: string
  guarantorIdNumber: string
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
  renewalNoticeDays: 5
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
export type IRentoraApiClientContractDetailResponse = IRentoraApiClientBaseResponse<IContract>
