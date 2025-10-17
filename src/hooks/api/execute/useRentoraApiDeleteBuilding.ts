import { useMutation } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks'

export const useRentoraApiDeleteBuilding = (prop: { apartmentId: string; buildingId: string }) => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)

  return useMutation<void, Error, string, unknown>({
    mutationKey: [rentoraApiExecuteClient.key.deleteBuilding, prop.apartmentId],
    mutationFn: () => rentoraApiExecuteClient.deleteBuilding(prop.apartmentId, prop.buildingId),
  })
}
