import type { IBaseUseMutation } from '@/types'

export interface ICreateContractRequestPayload {
  unitId: string
  tenantId: string
  rentalType: string
  startDate: string
  endDate: string
  rentalPrice: number
  depositAmount: number
  advancePaymentMonths: number
  utilitiesIncluded: boolean
  termsAndConditions?: string
  specialConditions?: string
  autoRenewal: boolean
  renewalNoticeDays: number
  documentUrl?: string
  waterMeterStart: number
  electricMeterStart: number
}

//hook use
export type IUseRentoraApiCreateContract = IBaseUseMutation<void, ICreateContractRequestPayload>
