import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { useMemo } from 'react'

import { RENTORA_API_BASE_URL } from '@/config'
import { DEFAULT_APARTMENT_LIST_DATA, DEFAULT_APARTMENT_LIST_METADATA } from '@/constants'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraApiApartmentListParams,
  IRentoraApiClientApartmentListResponse,
  IUseRentoraApiApartmentList,
} from '@/types'

export const useRentoraApiApartmentList = (props: {
  params: IRentoraApiApartmentListParams
}): IUseRentoraApiApartmentList => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  const { data: rawData, ...rest }: UseQueryResult<IRentoraApiClientApartmentListResponse['data']> = useQuery({
    queryKey: [
      rentoraApiQueryClient.key.apartmentList,
      props?.params?.page,
      props?.params?.size,
      props?.params?.status,
      props?.params?.search,
      props?.params?.sortBy,
      props?.params?.sortDir,
    ],
    queryFn: async () => {
      const { page, size, status, search, sortBy, sortDir }: IRentoraApiApartmentListParams = props?.params ?? {}
      return await rentoraApiQueryClient.apartmentList({
        ...(props?.params ?? {}),
        ...(status ? { status } : {}),
        ...(search ? { search } : {}),
        ...(sortBy ? { sortBy } : {}),
        ...(sortDir ? { sortDir } : {}),
        page,
        size,
      })
    },
    retry: 1,
  })

  const result: IRentoraApiClientApartmentListResponse['data'] = useMemo(() => {
    return {
      data: rawData?.data ?? ([] as IRentoraApiClientApartmentListResponse['data']['data']),
      pagination: rawData?.pagination ?? DEFAULT_APARTMENT_LIST_DATA,
      metadata: rawData?.metadata ?? DEFAULT_APARTMENT_LIST_METADATA,
    }
  }, [rawData])

  return {
    ...rest,
    ...result,
  } as IUseRentoraApiApartmentList
}
