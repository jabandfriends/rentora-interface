import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks/client'
import type {
  IRentoraApiClientUpdateMaintenanceResponse,
  IUpdateMaintenanceRequestPayload,
  IUseRentoraApiUpdateMaintenance,
} from '@/types'

export const useRentoraApiUpdateMaintenance = (): IUseRentoraApiUpdateMaintenance => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)

  return useMutation<
    IRentoraApiClientUpdateMaintenanceResponse['data'],
    AxiosError,
    { apartmentId: string; maintenanceId: string; payload: IUpdateMaintenanceRequestPayload }
  >({
    mutationKey: [rentoraApiExecuteClient.key.updateMaintenance],
    mutationFn: async ({
      apartmentId,
      maintenanceId,
      payload,
    }): Promise<IRentoraApiClientUpdateMaintenanceResponse['data']> => {
      const response: IRentoraApiClientUpdateMaintenanceResponse['data'] =
        await rentoraApiExecuteClient.updateMaintenance(apartmentId, maintenanceId, payload)
      return response
    },
  })
}
