import type { ServiceCategory } from '@/enum'
import type { IBaseUseMutation, IRentoraApiClientBaseResponse } from '@/types'

export type IBaseApartmentServiceRequestPayload = {
  serviceName: string
  price: number
  category: ServiceCategory
  isActive: boolean
}

export type ICreateApartmentServiceRequestPayload = IBaseApartmentServiceRequestPayload

export type IUpdateApartmentServiceRequestPayload = IBaseApartmentServiceRequestPayload & {
  apartmentServiceId: string
}

//hook
export type IUseRentoraApiCreateApartmentService = IBaseUseMutation<void, ICreateApartmentServiceRequestPayload>

export type IUseRentoraApiUpdateApartmentService = IBaseUseMutation<void, IUpdateApartmentServiceRequestPayload>

//-----payment service-----
export type IUpdateApartmentPaymentServiceRequestPayload = {
  paymentId: string
  promptPayImageFile?: File
  promptPayFilename?: string
  bankName: string
  bankAccountNumber: string
  accountHolderName: string
  promptpayNumber: string
  instructions: string
}
//response
export type IUpdateApartmentPaymentServiceResponse = IRentoraApiClientBaseResponse<{
  apartmentPaymentId: string
  presignedUrl: string
}>

export type IUseRentoraApiUpdateApartmentPaymentService = IBaseUseMutation<
  void,
  IUpdateApartmentPaymentServiceRequestPayload
>
