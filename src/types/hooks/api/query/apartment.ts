import type { IBasePaginateQueryResult, IRentoraApiClientBasePaginateResponse, Maybe } from '@/types'

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
}

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
