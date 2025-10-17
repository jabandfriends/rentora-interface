import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks/client'
import type { IRentoraApiClientUtilityListResponse, IUseRentoraApiClientUtilityListResponse } from '@/types'

export const useRentoraApiUtilityList = (prop: { apartmentId: string }): IUseRentoraApiClientUtilityListResponse => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  return useQuery<IRentoraApiClientUtilityListResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.utilityList, prop.apartmentId],
    queryFn: () => rentoraApiQueryClient.utilityList(prop.apartmentId),
    retry: 1,
    enabled: !!prop.apartmentId,
  })
}
