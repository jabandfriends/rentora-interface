import type { IBaseUseMutation } from '@/types'

export interface ICreateContractRequestPayload {
  unitId: string
  tenantId: string
  guarantorName: string
  guarantorPhone: string
  guarantorIdNumber: string
  rentalType: string
  startDate: string
  endDate: string
  rentalPrice: number
  depositAmount: number
  advancePaymentMonths: number
  lateFeeAmount: number
  utilitiesIncluded: boolean
  termsAndConditions?: string
  specialConditions?: string
  autoRenewal: boolean
  renewalNoticeDays: number
  documentUrl?: string
}

//hook use
export type IUseRentoraApiCreateContract = IBaseUseMutation<void, ICreateContractRequestPayload>
