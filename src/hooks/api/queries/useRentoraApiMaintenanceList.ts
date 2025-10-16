import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { useMemo } from 'react'

import { RENTORA_API_BASE_URL } from '@/config'
import { DEFAULT_MAINTENANCE_LIST_DATA, DEFAULT_MAINTENANCE_LIST_METADATA } from '@/constants'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraApiClientMaintenanceListResponse,
  IRentoraApiMaintenanceListParams,
  IUseRentoraApiMaintenanceList,
  Maybe,
} from '@/types'

export const useRentoraApiMaintenanceList = (props: {
  apartmentId: Maybe<string>
  params: IRentoraApiMaintenanceListParams
}): IUseRentoraApiMaintenanceList => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  const { data: rawData, ...rest }: UseQueryResult<IRentoraApiClientMaintenanceListResponse['data']> = useQuery({
    queryKey: [
      rentoraApiQueryClient.key.maintenanceList,
      props?.apartmentId,
      props?.params?.page,
      props?.params?.size,
      props?.params?.search,
      props?.params?.sortBy,
      props?.params?.sortDir,
      props?.params?.status,
      props?.params?.isRecurring,
      props?.params?.unitId,
    ],

    queryFn: async () => {
      const { page, size, search, sortBy, sortDir, status, isRecurring, unitId }: IRentoraApiMaintenanceListParams =
        props?.params ?? {}

      return await rentoraApiQueryClient.maintenanceList(
        {
          ...(props?.params ?? {}),
          ...(search ? { search } : {}),
          ...(sortBy ? { sortBy } : {}),
          ...(sortDir ? { sortDir } : {}),
          ...(status ? { status } : {}),
          ...(isRecurring ? { isRecurring } : {}),
          ...(unitId ? { unitId } : {}),
          page,
          size,
        },
        props.apartmentId!,
      )
    },
    enabled: !!props?.apartmentId,
    retry: 1,
  })

  const result: IRentoraApiClientMaintenanceListResponse['data'] = useMemo(() => {
    return {
      data: rawData?.data ?? ([] as IRentoraApiClientMaintenanceListResponse['data']['data']),
      pagination: rawData?.pagination ?? DEFAULT_MAINTENANCE_LIST_DATA,
      metadata: rawData?.metadata ?? DEFAULT_MAINTENANCE_LIST_METADATA,
    }
  }, [rawData])

  return {
    ...rest,
    ...result,
  } as IUseRentoraApiMaintenanceList
}
