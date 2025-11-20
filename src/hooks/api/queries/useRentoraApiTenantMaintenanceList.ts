import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { useMemo } from 'react'

import { RENTORA_API_BASE_URL } from '@/config'
import { DEFAULT_MAINTENANCE_LIST_DATA } from '@/constants'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraApiClientTenantMaintenanceListResponse,
  IRentoraApiTenantMaintenanceListParams,
  IUseRentoraApiTenantMaintenanceList,
  Maybe,
} from '@/types'

export const useRentoraApiTenantMaintenanceList = (props: {
  apartmentId: Maybe<string>
  params: IRentoraApiTenantMaintenanceListParams
}): IUseRentoraApiTenantMaintenanceList => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  const { data: rawData, ...rest }: UseQueryResult<IRentoraApiClientTenantMaintenanceListResponse['data']> = useQuery({
    queryKey: [
      rentoraApiQueryClient.key.tenantMaintenanceList,
      props?.apartmentId,
      props?.params?.page,
      props?.params?.size,
      props?.params?.sortBy,
      props?.params?.sortDir,
      props?.params?.status,
      props?.params?.isRecurring,
      props?.params?.priority,
    ],

    queryFn: async () => {
      const { page, size, sortBy, sortDir, status, isRecurring, priority }: IRentoraApiTenantMaintenanceListParams =
        props?.params ?? {}

      return await rentoraApiQueryClient.tenantMaintenanceList(props.apartmentId!, {
        ...(props?.params ?? {}),
        ...(sortBy ? { sortBy } : {}),
        ...(sortDir ? { sortDir } : {}),
        ...(status ? { status } : {}),
        ...(isRecurring !== undefined ? { isRecurring } : {}),
        ...(priority ? { priority } : {}),
        page,
        size,
      })
    },
    enabled: !!props?.apartmentId,
    retry: 1,
  })

  const result: IRentoraApiClientTenantMaintenanceListResponse['data'] = useMemo(() => {
    return {
      data: rawData?.data ?? ([] as IRentoraApiClientTenantMaintenanceListResponse['data']['data']),
      pagination: rawData?.pagination ?? DEFAULT_MAINTENANCE_LIST_DATA,
    }
  }, [rawData])

  return {
    ...rest,
    ...result,
  } as IUseRentoraApiTenantMaintenanceList
}
