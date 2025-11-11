import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraApiClientMaintenanceYearlyStatisticsResponse,
  IUseRentoraApiMaintenanceYearlyStatistics,
  Maybe,
} from '@/types'

export const useRentoraApiMaintenanceAnalyticYearlyStats = (props: {
  apartmentId: Maybe<string>
}): IUseRentoraApiMaintenanceYearlyStatistics => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  return useQuery<IRentoraApiClientMaintenanceYearlyStatisticsResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.maintenanceYearlyStatistics, props.apartmentId],
    queryFn: () => rentoraApiQueryClient.maintenanceYearlyStatistics(props.apartmentId),
    enabled: !!props.apartmentId,
    retry: 1,
  })
}
