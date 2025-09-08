import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query'

// [BASE]
// type IBaseUseMutation<TData, TVariables> = UseMutationResult<TData, Error, TVariables>

// type IBaseUseQueryResult<T> = UseQueryResult<T, Error>

export type IPaginate = {
  page: number
  size: number
  total: number
}

// type IBasePaginateQueryResult<T> = Omit<UseQueryResult<T, Error>, 'data'> & Required<T>

// type IRentoraApiClientBasePaginateResponse<T> = {
//   data: Array<T>
//   pagination: IPaginate
// }

// export type IRentoraApiClientApartmentResponse = IRentoraApiClientBasePaginateResponse<IApartment>

// export type IUseMemepadApiApartment = IBasePaginateQueryResult<IRentoraApiClientApartmentResponse['result']>
