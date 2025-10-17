import { useMutation, useQueryClient } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient, RentoraApiQueryClient } from '@/hooks'
import type { ICreateBuildingRequestPayload, IUseRentoraApiCreateBuilding } from '@/types'

export const useRentoraApiCreateBuilding = (apartmentId: string): IUseRentoraApiCreateBuilding => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  //query key
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  const queryClient = useQueryClient()

  return useMutation<void, Error, ICreateBuildingRequestPayload>({
    mutationKey: [rentoraApiExecuteClient.key.createBuilding],
    mutationFn: (payload: ICreateBuildingRequestPayload) =>
      rentoraApiExecuteClient.createBuilding(apartmentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [rentoraApiQueryClient.key.buildingListNoPaginate, apartmentId] })
    },
  })
}
