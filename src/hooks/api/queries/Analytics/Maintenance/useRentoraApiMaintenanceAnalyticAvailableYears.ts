import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraApiClientMaintenanceAvailableYearsResponse,
  IUseRentoraApiMaintenanceAvailableYears,
  Maybe,
} from '@/types'

export const useRentoraApiMaintenanceAnalyticAvailableYears = (props: {
  apartmentId: Maybe<string>
}): IUseRentoraApiMaintenanceAvailableYears => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  return useQuery<IRentoraApiClientMaintenanceAvailableYearsResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.maintenanceAvailableYears, props.apartmentId],
    queryFn: async () => {
      return await rentoraApiQueryClient.maintenanceAvailableYears(props.apartmentId)
    },
    enabled: !!props.apartmentId,
    retry: 1,
  })
}
