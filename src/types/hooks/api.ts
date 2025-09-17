import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query'

import type { Maybe } from '@/types'

type IBaseUseMutation<TData, TVariables> = UseMutationResult<TData, Error, TVariables>

// type IBaseUseQuery<TData> = UseQueryResult<TData, Error>

type IBasePaginateQueryResult<T> = Omit<UseQueryResult<T, Error>, 'data'> & Required<T>

export type IRentoraApiClientErrorResponse = IRentoraApiClientBaseResponse<null>

//RentoraBaseApiResponse
type IRentoraApiClientBaseResponse<T> = {
  success: boolean
  message: string
  data: T
}

export type IPaginate = {
  page: number
  size: number
  totalPages: number
  totalElements: number
}
type IRentoraApiClientBasePaginateResponse<T> = IRentoraApiClientBaseResponse<{
  data: Array<T>
  pagination: IPaginate
}>

export interface IAuthRequest {
  email: string
  password: string
}

//hooks type
export type IUseRentoraApiAuthenticate = IBaseUseMutation<IRentoraApiClientAuthenticateResponse['data'], IAuthRequest>

export type IUseRentoraApiApartmentList = IBasePaginateQueryResult<IRentoraApiClientApartmentListResponse['data']>
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

export type IRentoraApiClientApartmentListResponse = IRentoraApiClientBasePaginateResponse<IApartment>

export type IRentoraApiApartmentListParams = {
  page?: number
  size?: number
  search?: string
  sortBy?: 'name' | 'createdAt' | 'updatedAt'
  sortDir?: 'asc' | 'desc'
}
export type IRentoraApiClientAuthenticateResponse = IRentoraApiClientBaseResponse<{
  accessToken: string
  expireIn: number
  userInfo: {
    id: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: Maybe<string>
    profileImageUrl: Maybe<string>
    mustChangePassword: boolean
    lastLogin: string
    apartmentRoles: Array<{
      apartmentId: string
      apartmentName: string
      role: string
    }>
  }
  tokenType: string
}>

// type IBasePaginateQueryResult<T> = Omit<UseQueryResult<T, Error>, 'data'> & Required<T>

// type IRentoraApiClientBasePaginateResponse<T> = {
//   data: Array<T>
//   pagination: IPaginate
// }

// export type IRentoraApiClientApartmentResponse = IRentoraApiClientBasePaginateResponse<IApartment>

// export type IUseMemepadApiApartment = IBasePaginateQueryResult<IRentoraApiClientApartmentResponse['result']>
