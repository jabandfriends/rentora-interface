import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import type { IRentoraApiMaintenanceDetailParams, IUseRentoraApiMaintenanceDetail } from '@/types'

export const useRentoraApiMaintenanceDetail = (
  props: IRentoraApiMaintenanceDetailParams,
): IUseRentoraApiMaintenanceDetail => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  return useQuery({
    queryKey: [rentoraApiQueryClient.key.maintenanceDetail, props?.apartmentId, props?.maintenanceId],
    queryFn: async () => {
      return await rentoraApiQueryClient.maintenanceDetail({
        apartmentId: props?.apartmentId,
        maintenanceId: props?.maintenanceId,
      })
    },
  })
}
