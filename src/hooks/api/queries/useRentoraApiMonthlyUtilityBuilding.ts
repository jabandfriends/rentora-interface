import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { useMemo } from 'react'

import { RENTORA_API_BASE_URL } from '@/config'
import { DEFAULT_APARTMENT_LIST_DATA, DEFAULT_UNIT_LIST_METADATA } from '@/constants'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraApiClietMonthlyUtilityBuildingResponse,
  IRentoraApiMonthlyUtilityBuildingListResponse,
  IRentoraApiMonthlyUtilityDetailParams,
  IUseRentoraApiMonthlyUtilityBuilding,
} from '@/types'

export const useRentoraApiMonthlyUtilityBuildings = (props: {
  apartmentId: string
  params: IRentoraApiMonthlyUtilityDetailParams
}): IUseRentoraApiMonthlyUtilityBuilding => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  const { data: rawData, ...rest }: UseQueryResult<IRentoraApiClietMonthlyUtilityBuildingResponse['data']> = useQuery({
    queryKey: [
      rentoraApiQueryClient.key.monthlyUtilityBuilding,
      props.apartmentId,
      props?.params?.page,
      props?.params?.size,
      props?.params?.search,
      props?.params?.sortBy,
      props?.params?.sortDir,
    ],
    queryFn: async () => {
      const { page, size, search, sortBy, sortDir }: IRentoraApiMonthlyUtilityDetailParams = props?.params ?? {}
      return await rentoraApiQueryClient.monthlyUtilityBuilding(props?.apartmentId, {
        ...(props?.params ?? {}),
        ...(search ? { search } : {}),
        ...(sortBy ? { sortBy } : {}),
        ...(sortDir ? { sortDir } : {}),
        page,
        size,
      })
    },
    retry: 1,
  })

  const result: IRentoraApiMonthlyUtilityBuildingListResponse['data'] = useMemo(() => {
    return {
      data: rawData?.data ?? ([] as IRentoraApiMonthlyUtilityBuildingListResponse['data']['data']),
      pagination: rawData?.pagination ?? DEFAULT_APARTMENT_LIST_DATA,
      metadata: rawData?.metadata ?? DEFAULT_UNIT_LIST_METADATA,
    }
  }, [rawData])

  return {
    ...rest,
    ...result,
  } as IUseRentoraApiMonthlyUtilityBuilding
}
