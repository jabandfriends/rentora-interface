import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { useMemo } from 'react'

import { RENTORA_API_BASE_URL } from '@/config'
import { DEFAULT_TENANT_LIST_DATA, DEFAULT_TENANT_LIST_METADATA } from '@/constants'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraApiClientTenantListResponse,
  IRentoraApiTenantListParams,
  IUseRentoraApiTenantList,
  Maybe,
} from '@/types'

export const useRentoraApiTenantList = (props: {
  apartmentId: Maybe<string>
  params: IRentoraApiTenantListParams
}): IUseRentoraApiTenantList => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  const { data: rawData, ...rest }: UseQueryResult<IRentoraApiClientTenantListResponse['data']> = useQuery({
    queryKey: [
      rentoraApiQueryClient.key.tenantList,
      props?.apartmentId,
      props?.params?.page,
      props?.params?.size,
      props?.params?.isActive,
      props?.params?.name,
      props?.params?.sortBy,
      props?.params?.sortDir,
    ],
    queryFn: async () => {
      const { page, size, isActive, name, sortBy, sortDir }: IRentoraApiTenantListParams = props?.params ?? {}
      return await rentoraApiQueryClient.tenantList(props?.apartmentId, {
        ...(props?.params ?? {}),
        ...(isActive ? { isActive } : {}),
        ...(name ? { name } : {}),
        ...(sortBy ? { sortBy } : {}),
        ...(sortDir ? { sortDir } : {}),
        page,
        size,
      })
    },
    retry: 1,
    enabled: !!props?.apartmentId,
  })

  const result: IRentoraApiClientTenantListResponse['data'] = useMemo(() => {
    return {
      data: rawData?.data ?? ([] as IRentoraApiClientTenantListResponse['data']['data']),
      pagination: rawData?.pagination ?? DEFAULT_TENANT_LIST_DATA,
      metadata: rawData?.metadata ?? DEFAULT_TENANT_LIST_METADATA,
    }
  }, [rawData])

  return {
    ...rest,
    ...result,
  } as IUseRentoraApiTenantList
}
