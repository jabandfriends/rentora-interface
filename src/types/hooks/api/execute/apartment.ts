import type { LateFeeType } from '@/enum'
import type { IBaseUseMutation, IRentoraApiClientBaseResponse } from '@/types'

//put presigned url payload type
export type IPutPresignedUrlRequest = {
  imgFile: File
  presignedUrl: string
}

//payload type
type ICreateApartmentRequestBase = {
  name: string
  phoneNumber: string
  taxId?: string
  paymentDueDay: number
  lateFee: number
  lateFeeType: LateFeeType
  gracePeriodDays: number
  address?: string
  city?: string
  state?: string
  postalCode: string
  country: string
}

export type ICreateApartmentRequestPayload = ICreateApartmentRequestBase & {
  logoFile?: File
}

export type ICreateApartmentRequestApi = ICreateApartmentRequestBase & {
  logoFileName?: string
}

//hook type
export type IUseRentoraApiCreateApartment = IBaseUseMutation<
  IRentoraApiClientCreateApartmentResponse['data'],
  ICreateApartmentRequestPayload
>

//response type
export type IRentoraApiClientCreateApartmentResponse = IRentoraApiClientBaseResponse<{
  apartmentId: string
  presignedUrl: string
  logoUrl: string
}>
