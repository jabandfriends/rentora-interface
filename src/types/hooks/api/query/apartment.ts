import type { APARTMENT_LATE_FEE_TYPE } from '@/enum'
import type {
  IBasePaginateQueryResult,
  IBaseUseQuery,
  IRentoraApiClientBasePaginateWithMetadataResponse,
  IRentoraApiClientBaseResponse,
  Maybe,
} from '@/types'

//hooks type useRentoraApiApartmentList
export type IUseRentoraApiApartmentList = IBasePaginateQueryResult<IRentoraApiClientApartmentListResponse['data']>

//data
export type IApartment = {
  id: string
  name: string
  logoUrl: Maybe<string>
  phoneNumber: string
  address: string
  city: string
  state: string
  status: string
  createdAt: string
  updatedAt: string
  buildingCount: number
  unitCount: number
  activeContractCount: number
  logoPresignedUrl: string
}

export type IApartmentDetail = IApartment & {
  taxId: string
  paymentDueDay: number
  lateFee: number
  lateFeeType: APARTMENT_LATE_FEE_TYPE
  gracePeriodDays: number
  postalCode: string
  country: string
  timezone: string
  currency: string
  totalTenants: number
}

//metadata
export type IApartmentListMetadata = {
  totalApartments: number
  totalActiveApartments: number
}

//response
export type IRentoraApiClientApartmentListResponse = IRentoraApiClientBasePaginateWithMetadataResponse<
  IApartment,
  IApartmentListMetadata
>

//params
export type IRentoraApiApartmentListParams = {
  page?: number
  size?: number
  status?: string
  search?: string
  sortBy?: 'name' | 'createdAt' | 'updatedAt'
  sortDir?: 'asc' | 'desc'
}

export type IUseRentoraApiApartmentDetail = IBaseUseQuery<IRentoraApiClientApartmentDetailResponse['data']>

export type IRentoraApiClientApartmentDetailResponse = IRentoraApiClientBaseResponse<IApartmentDetail>

export type IRentoraApiApartmentDetailParams = {
  apartmentId: string
}
