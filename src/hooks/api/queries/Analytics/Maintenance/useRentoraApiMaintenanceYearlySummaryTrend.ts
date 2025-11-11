import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraApiClientMaintenanceYearlySummaryTrendResponse,
  IUseRentoraApiMaintenanceYearlySummaryTrend,
  Maybe,
} from '@/types'

export const useRentoraApiMaintenanceYearlySummaryTrend = (props: {
  apartmentId: Maybe<string>
}): IUseRentoraApiMaintenanceYearlySummaryTrend => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  return useQuery<IRentoraApiClientMaintenanceYearlySummaryTrendResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.maintenanceYearlySummaryTrend, props.apartmentId],
    queryFn: () => rentoraApiQueryClient.maintenanceYearlySummaryTrend(props.apartmentId),
    enabled: !!props.apartmentId,
    retry: 1,
  })
}
