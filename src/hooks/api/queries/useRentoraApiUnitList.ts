import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { useMemo } from 'react'

import { RENTORA_API_BASE_URL } from '@/config'
import { DEFAULT_APARTMENT_LIST_DATA, DEFAULT_UNIT_LIST_METADATA } from '@/constants'
import { RentoraApiQueryClient } from '@/hooks'
import type { IRentoraApiClientUnitListResponse, IRentoraApiUnitListParams, IUseRentoraApiUnitList } from '@/types'

export const useRentoraApiUnitList = (props: {
  apartmentId: string
  params: IRentoraApiUnitListParams
}): IUseRentoraApiUnitList => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  const { data: rawData, ...rest }: UseQueryResult<IRentoraApiClientUnitListResponse['data']> = useQuery({
    queryKey: [
      rentoraApiQueryClient.key.unitList,
      props?.params?.page,
      props?.params?.size,
      props?.params?.search,
      props?.params?.sortBy,
      props?.params?.sortDir,
      props?.params?.status,
      props?.params?.buildingName,
    ],
    queryFn: async () => {
      const { page, size, search, sortBy, sortDir, status, buildingName }: IRentoraApiUnitListParams =
        props?.params ?? {}
      return await rentoraApiQueryClient.unitList(props?.apartmentId, {
        ...(props?.params ?? {}),
        ...(search ? { search } : {}),
        ...(sortBy ? { sortBy } : {}),
        ...(sortDir ? { sortDir } : {}),
        ...(status ? { status } : {}),
        ...(buildingName ? { buildingName } : {}),
        page,
        size,
      })
    },
    retry: 1,
  })

  const result: IRentoraApiClientUnitListResponse['data'] = useMemo(() => {
    return {
      data: rawData?.data ?? ([] as IRentoraApiClientUnitListResponse['data']['data']),
      pagination: rawData?.pagination ?? DEFAULT_APARTMENT_LIST_DATA,
      metadata: rawData?.metadata ?? DEFAULT_UNIT_LIST_METADATA,
    }
  }, [rawData])

  return {
    ...rest,
    ...result,
  } as IUseRentoraApiUnitList
}
