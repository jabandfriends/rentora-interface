import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient, RentoraApiQueryClient } from '@/hooks'
import type { IRentoraApiClientDeleteMaintenanceResponse, IUseRentoraApiDeleteMaintenance } from '@/types'

export const useRentoraApiDeleteMaintenance = (): IUseRentoraApiDeleteMaintenance => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  const queryClient = useQueryClient()
  return useMutation<
    IRentoraApiClientDeleteMaintenanceResponse['data'],
    AxiosError,
    { apartmentId: string; maintenanceId: string }
  >({
    mutationKey: [rentoraApiExecuteClient.key.deleteMaintenance],
    mutationFn: ({ apartmentId, maintenanceId }: { apartmentId: string; maintenanceId: string }) =>
      rentoraApiExecuteClient.deleteMaintenance(apartmentId, maintenanceId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [rentoraApiQueryClient.key.maintenanceList],
      })
    },
  })
}
