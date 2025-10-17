import { useMutation } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks'
import type { ICreateBuildingRequestPayload, IUseRentoraApiCreateBuilding } from '@/types'

export const useRentoraApiCreateBuilding = (apartmentId: string): IUseRentoraApiCreateBuilding => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)

  return useMutation<void, Error, ICreateBuildingRequestPayload>({
    mutationKey: [rentoraApiExecuteClient.key.createBuilding],
    mutationFn: (payload: ICreateBuildingRequestPayload) =>
      rentoraApiExecuteClient.createBuilding(apartmentId, payload),
  })
}
