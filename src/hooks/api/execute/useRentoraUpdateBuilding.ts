import { useMutation } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks'
import type { IUpdateBuildingRequestPayload, IUseRentoraApiUpdateBuilding } from '@/types'

export const useRentoraUpdateBuilding = (prop: {
  apartmentId: string
  buildingId: string
}): IUseRentoraApiUpdateBuilding => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)

  return useMutation<void, Error, IUpdateBuildingRequestPayload>({
    mutationKey: [rentoraApiExecuteClient.key.updateBuilding],
    mutationFn: (payload: IUpdateBuildingRequestPayload) =>
      rentoraApiExecuteClient.updateBuilding(prop.apartmentId, prop.buildingId, payload),
  })
}
