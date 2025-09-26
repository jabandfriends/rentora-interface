import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks/client'
import type { IRentoraApiClientDeleteMaintenanceResponse, IUseRentoraApiDeleteMaintenance } from '@/types'

export const useRentoraApiDeleteMaintenance = (): IUseRentoraApiDeleteMaintenance => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)

  return useMutation<
    IRentoraApiClientDeleteMaintenanceResponse['data'],
    AxiosError,
    { apartmentId: string; maintenanceId: string }
  >({
    mutationKey: [rentoraApiExecuteClient.key.deleteMaintenance],
    mutationFn: async ({ apartmentId, maintenanceId }): Promise<IRentoraApiClientDeleteMaintenanceResponse['data']> => {
      const response: IRentoraApiClientDeleteMaintenanceResponse['data'] =
        await rentoraApiExecuteClient.deleteMaintenance(apartmentId, maintenanceId)
      return response
    },
  })
}
