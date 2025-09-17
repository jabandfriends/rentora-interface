// import { useQuery, type UseQueryResult } from '@tanstack/react-query'
// import { useMemo } from 'react'

// import { RENTORA_API_BASE_URL } from '@/config'
// import { DEFAULT_PROJECT_LIST_PAGINATION_DATA } from '@/constants'
// import { RentoraApiQueryClient } from '@/hooks'
// import type {
//   IRentoraApiClientApartmentParams,
//   IRentoraApiClientApartmentResponse,
//   IUseRentoraApiApartment,
// } from '@/types'

// type IRentoraApiClientApartmentListParams = {
//   page?: number
//   name?: string
//   size?: number
// }
// export const useRentoraApiApartmentList = (props: { params: IRentoraApiClientApartmentListParams }) => {
//   const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

//   const { data: rawData, ...rest }: UseQueryResult<IRentoraApiClientApartmentResponse['result']> = useQuery({
//     queryKey: [rentoraApiQueryClient.key.apartmentList, props?.params?.page, props?.params?.name, props?.params?.size],
//     queryFn: async () => {
//       const { page, name, size }: IRentoraApiClientApartmentListParams = props?.params || {}

//       return await rentoraApiQueryClient.apartmentList({
//         ...(props?.params || {}),
//         ...(name ? { name } : {}),
//         ...(stages ? { stages } : {}),
//         page,
//         size,
//       })
//     },
//     retry: 1,
//   })

//   const result: IRentoraApiClientApartmentResponse['result'] =
//     useMemo((): IRentoraApiClientApartmentResponse['result'] => {
//       return {
//         data: rawData?.data || ([] as IRentoraApiClientApartmentResponse['result']['data']),
//         pagination: rawData?.pagination || DEFAULT_PROJECT_LIST_PAGINATION_DATA,
//       }
//     }, [rawData])

//   return {
//     ...result,
//     ...rest,
//   } as IUseRentoraApiApartment
// }
