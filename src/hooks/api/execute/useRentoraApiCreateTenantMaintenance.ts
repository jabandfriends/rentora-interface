import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks/client'
import type {
  ICreateTenantMaintenanceRequestPayload,
  IRentoraApiClientCreateMaintenanceResponse,
  IUseRentoraApiCreateTenantMaintenance,
} from '@/types'

export const useRentoraApiCreateTenantMaintenance = (): IUseRentoraApiCreateTenantMaintenance => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)

  return useMutation<
    IRentoraApiClientCreateMaintenanceResponse['data'],
    AxiosError,
    { apartmentId: string; payload: ICreateTenantMaintenanceRequestPayload }
  >({
    mutationKey: [rentoraApiExecuteClient.key.createTenantMaintenance],
    mutationFn: async ({ apartmentId, payload }): Promise<IRentoraApiClientCreateMaintenanceResponse['data']> => {
      const response: IRentoraApiClientCreateMaintenanceResponse['data'] =
        await rentoraApiExecuteClient.createTenantMaintenance(apartmentId, payload)
      return response
    },
  })
}

