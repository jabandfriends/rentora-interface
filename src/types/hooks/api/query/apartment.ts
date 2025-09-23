import type {
  IBasePaginateQueryResult,
  IBaseUseQuery,
  IRentoraApiClientBasePaginateResponse,
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
  lateFeeType: string
  gracePeriodDays: number
  postalCode: string
  country: string
  timezone: string
  currency: string
  totalTenants: number
}

export type IUser = {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: Maybe<string>
  profileImageUrl: Maybe<string>
  mustChangePassword: boolean
  lastLogin: string
}

export type IRentoraApiClientUserResponse = IRentoraApiClientBaseResponse<IUser>

//response
export type IRentoraApiClientApartmentListResponse = IRentoraApiClientBasePaginateResponse<IApartment>

//params
export type IRentoraApiApartmentListParams = {
  page?: number
  size?: number
  search?: string
  sortBy?: 'name' | 'createdAt' | 'updatedAt'
  sortDir?: 'asc' | 'desc'
}

export type IUseRentoraApiApartmentDetail = IBaseUseQuery<IRentoraApiClientApartmentDetailResponse['data']>

export type IRentoraApiClientApartmentDetailResponse = IRentoraApiClientBaseResponse<IApartmentDetail>

export type IRentoraApiApartmentDetailParams = {
  apartmentId: string
}
