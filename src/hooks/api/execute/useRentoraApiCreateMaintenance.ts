import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks/client'
import type {
  ICreateMaintenanceRequestPayload,
  IRentoraApiClientCreateMaintenanceResponse,
  IUseRentoraApiCreateMaintenance,
} from '@/types'

export const useRentoraApiCreateMaintenance = (): IUseRentoraApiCreateMaintenance => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)

  return useMutation<
    IRentoraApiClientCreateMaintenanceResponse['data'],
    AxiosError,
    { apartmentId: string; payload: ICreateMaintenanceRequestPayload }
  >({
    mutationKey: [rentoraApiExecuteClient.key.createMaintenance],
    mutationFn: async ({ apartmentId, payload }): Promise<IRentoraApiClientCreateMaintenanceResponse['data']> => {
      const response: IRentoraApiClientCreateMaintenanceResponse['data'] =
        await rentoraApiExecuteClient.createMaintenance(apartmentId, payload)
      return response
    },
  })
}
