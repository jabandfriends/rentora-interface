import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { useMemo } from 'react'

import { RENTORA_API_BASE_URL } from '@/config'
import { DEFAULT_SUPPLY_LIST_DATA, DEFAULT_SUPPLY_LIST_METADATA } from '@/constants'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraApiClientSupplyListResponse,
  IRentoraApiSupplyListParams,
  IUseRentoraApiSupplyList,
  Maybe,
} from '@/types'

export const useRentoraApiSupplyList = (props: {
  apartmentId: Maybe<string>
  params: IRentoraApiSupplyListParams
}): IUseRentoraApiSupplyList => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  const { data: rawData, ...rest }: UseQueryResult<IRentoraApiClientSupplyListResponse['data']> = useQuery({
    queryKey: [
      rentoraApiQueryClient.key.supplyList,
      props?.apartmentId,
      props?.params?.page,
      props?.params?.size,
      props?.params?.search,
      props?.params?.category,
      props?.params?.sortBy,
      props?.params?.sortDir,
    ],
    queryFn: async () => {
      const { page, size, search, category, sortBy, sortDir }: IRentoraApiSupplyListParams = props?.params ?? {}
      return await rentoraApiQueryClient.supplyList(props?.apartmentId, {
        ...(props?.params ?? {}),
        ...(category ? { category } : {}),
        ...(search ? { search } : {}),
        ...(sortBy ? { sortBy } : {}),
        ...(sortDir ? { sortDir } : {}),
        page,
        size,
      })
    },
    retry: 1,
    enabled: !!props?.apartmentId,
  })

  const result: IRentoraApiClientSupplyListResponse['data'] = useMemo(() => {
    return {
      data: rawData?.data ?? ([] as IRentoraApiClientSupplyListResponse['data']['data']),
      pagination: rawData?.pagination ?? DEFAULT_SUPPLY_LIST_DATA,
      metadata: rawData?.metadata ?? DEFAULT_SUPPLY_LIST_METADATA,
    }
  }, [rawData])
  return {
    ...rest,
    ...result,
  } as IUseRentoraApiSupplyList
}
