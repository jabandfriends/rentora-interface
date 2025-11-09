import type { IBaseUseQuery, IRentoraApiClientBaseResponse } from '@/types'

export type IApartmentPayment = {
  apartmentPaymentId: string
  methodType: string
  bankName: string
  bankAccountNumber: string
  accountHolderName: string
  promptpayNumber: string
  promptpayURL: string
  isActive: boolean
}

//reponse
export type IRentoraApiClientApartmentPaymentResponse = IRentoraApiClientBaseResponse<IApartmentPayment>

//hook
export type IUseRentoraApiApartmentPayment = IBaseUseQuery<IRentoraApiClientApartmentPaymentResponse['data']>
