import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IMaintenanceMonthlySummaryTrendParam,
  IRentoraApiClientMaintenanceMonthlySummaryTrendResponse,
  IUseRentoraApiMaintenanceMonthlySummaryTrend,
  Maybe,
} from '@/types'

export const useRentoraApiMaintenanceAnalyticMaintenanceMonthlyTrend = (props: {
  apartmentId: Maybe<string>
  params: IMaintenanceMonthlySummaryTrendParam
}): IUseRentoraApiMaintenanceMonthlySummaryTrend => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  return useQuery<IRentoraApiClientMaintenanceMonthlySummaryTrendResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.maintenanceMonthlySummaryTrend, props.apartmentId, props.params.year],
    queryFn: () => rentoraApiQueryClient.maintenanceMonthlySummaryTrend(props.apartmentId, props.params),
    enabled: !!props.apartmentId && !!props.params.year,
    retry: 1,
  })
}
