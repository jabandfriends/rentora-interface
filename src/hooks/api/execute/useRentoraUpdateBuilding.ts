import { useMutation, useQueryClient } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient, RentoraApiQueryClient } from '@/hooks'
import type { IUpdateBuildingRequestPayload, IUseRentoraApiUpdateBuilding } from '@/types'

export const useRentoraUpdateBuilding = (prop: {
  apartmentId: string
  buildingId: string
}): IUseRentoraApiUpdateBuilding => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  const rentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  const queryClient = useQueryClient()
  return useMutation<void, Error, IUpdateBuildingRequestPayload>({
    mutationKey: [rentoraApiExecuteClient.key.updateBuilding, prop.apartmentId, prop.buildingId],
    mutationFn: (payload: IUpdateBuildingRequestPayload) =>
      rentoraApiExecuteClient.updateBuilding(prop.apartmentId, prop.buildingId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [rentoraApiQueryClient.key.buildingListNoPaginate, prop.apartmentId],
      })
    },
  })
}
