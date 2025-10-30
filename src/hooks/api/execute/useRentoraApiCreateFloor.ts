import { useMutation, useQueryClient } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient, RentoraApiQueryClient } from '@/hooks'
import type { ICreateFloorRequestPayload, IUseFloorCreate } from '@/types'

export const useRentoraApiCreateFloor = (props: { apartmentId: string; buildingId: string }): IUseFloorCreate => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  const queryClient = useQueryClient()
  return useMutation<void, Error, ICreateFloorRequestPayload>({
    mutationKey: [rentoraApiExecuteClient.key.createFloor, props.apartmentId],
    mutationFn: (payload: ICreateFloorRequestPayload) => rentoraApiExecuteClient.createFloor(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [rentoraApiQueryClient.key.floorList, props.buildingId],
      })
    },
  })
}
