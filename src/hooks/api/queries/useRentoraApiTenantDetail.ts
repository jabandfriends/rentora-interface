import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks/client'
import type { IRentoraApiClientTenantDetailResponse, IUseRentoraApiTenantDetail, Maybe } from '@/types'

export const useRentoraApiTenantDetail = (props: { userId: Maybe<string> }): IUseRentoraApiTenantDetail => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  return useQuery<IRentoraApiClientTenantDetailResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.tenantDetail, props?.userId],
    queryFn: async () => {
      return await rentoraApiQueryClient.tenantDetail(props?.userId)
    },
    retry: 1,
    enabled: !!props?.userId,
  })
}
