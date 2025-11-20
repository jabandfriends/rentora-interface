import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { useMemo } from 'react'

import { RENTORA_API_BASE_URL } from '@/config'
import { DEFAULT_MONTHLY_UTILITY_FLOOR_LIST_DATA, DEFAULT_MONTHLY_UTILITY_FLOOR_METADATA } from '@/constants'
import { RentoraApiQueryClient } from '@/hooks/client'
import type {
  IRentoraApiMonthlyUtilityFloorListResponse,
  IRentoraApiMonthlyUtilityFloorParams,
  IUseRentoraApiMonthlyUtilityFloor,
} from '@/types'

export const useRentoraApiMonthlyUtilityFloor = (props: {
  apartmentId: string
  params: IRentoraApiMonthlyUtilityFloorParams
}): IUseRentoraApiMonthlyUtilityFloor => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  const { data: rawData, ...rest }: UseQueryResult<IRentoraApiMonthlyUtilityFloorListResponse['data']> = useQuery({
    queryKey: [
      rentoraApiQueryClient.key.monthlyUtilityFloor,
      props.apartmentId,
      props?.params?.buildingId,
      props?.params?.floorId,
      props?.params?.page,
      props?.params?.size,
      props?.params?.search,
      props?.params?.sortBy,
      props?.params?.sortDir,
    ],
    queryFn: async () => {
      const { page, size, search, sortBy, sortDir }: IRentoraApiMonthlyUtilityFloorParams = props?.params ?? {}
      return await rentoraApiQueryClient.monthlyUtilityFloor(props?.apartmentId, {
        ...(props?.params ?? {}),
        ...(search ? { search } : {}),
        ...(sortBy ? { sortBy } : {}),
        ...(sortDir ? { sortDir } : {}),
        page,
        size,
      })
    },
    retry: 1,
    enabled: !!props.params.buildingId,
  })

  const result: IRentoraApiMonthlyUtilityFloorListResponse['data'] = useMemo(() => {
    return {
      data: rawData?.data ?? ([] as IRentoraApiMonthlyUtilityFloorListResponse['data']['data']),
      pagination: rawData?.pagination ?? DEFAULT_MONTHLY_UTILITY_FLOOR_LIST_DATA,
      metadata: rawData?.metadata ?? DEFAULT_MONTHLY_UTILITY_FLOOR_METADATA,
    }
  }, [rawData])

  return {
    ...rest,
    ...result,
  } as IUseRentoraApiMonthlyUtilityFloor
}
