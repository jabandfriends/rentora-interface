import type { CONTRACT_STATUS } from '@/enum'
import type { IBaseUseMutation, IRentoraApiClientBaseResponse } from '@/types'

export interface ICreateContractRequestPayload {
  unitId: string
  tenantId: string
  rentalType: string
  startDate: string
  endDate: string
  rentalPrice: number
  depositAmount?: number
  advancePaymentMonths?: number
  termsAndConditions?: string
  specialConditions?: string
  autoRenewal: boolean
  renewalNoticeDays?: number
  documentUrl?: string
  waterMeterStart: number
  electricMeterStart: number
}

//hook use
export type IUseRentoraApiCreateContract = IBaseUseMutation<void, ICreateContractRequestPayload>

export type IUpdateContractRequestPayload = Partial<
  {
    contractId: string
    documentFilename: string
    status: CONTRACT_STATUS
    documentFile?: File
  } & Pick<
    ICreateContractRequestPayload,
    | 'endDate'
    | 'rentalPrice'
    | 'depositAmount'
    | 'advancePaymentMonths'
    | 'termsAndConditions'
    | 'specialConditions'
    | 'autoRenewal'
    | 'renewalNoticeDays'
  >
>

//response
export type IRentoraApiClientUpdateContractResponse = IRentoraApiClientBaseResponse<{
  contractId: string
  presignedUrl: string
}>

//hook
export type IUseRentoraApiUpdateContract = IBaseUseMutation<void, IUpdateContractRequestPayload>
