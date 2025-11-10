import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraApiClientMaintenanceCategorySummaryResponse,
  IUseRentoraApiMaintenanceCategorySummary,
  Maybe,
} from '@/types'

export const useRentoraApiMaintenanceAnalyticCategorySummary = (props: {
  apartmentId: Maybe<string>
}): IUseRentoraApiMaintenanceCategorySummary => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  return useQuery<IRentoraApiClientMaintenanceCategorySummaryResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.maintenanceCategorySummary, props.apartmentId],
    queryFn: () => rentoraApiQueryClient.maintenanceCategorySummary(props.apartmentId),
    enabled: !!props.apartmentId,
    retry: 1,
  })
}
