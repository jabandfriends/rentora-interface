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
export type IUseRentoraApiSetupApartment = IBaseUseMutation<void, ISetupApartmentRequestPayload>

//response type
export type IRentoraApiClientCreateApartmentResponse = IRentoraApiClientBaseResponse<{
  apartmentId: string
  presignedUrl: string
  logoUrl: string
}>

export type ISetupApartmentRequestPayload = {
  apartmentId: string
  bankName: string
  bankAccountHolder: string
  bankAccountNumber: string
  buildings: Array<{
    buildingName: string
    totalFloors: number
  }>
  electricityFlat: number
  electricityPrice: number
  electricityType: string
  services: Array<{
    name: string
    price: number
  }>
  waterFlat: number
  waterPrice: number
  waterType: string
}
