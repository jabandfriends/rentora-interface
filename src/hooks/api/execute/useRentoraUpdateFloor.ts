import { useMutation, useQueryClient } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient, RentoraApiQueryClient } from '@/hooks'
import type { IUpdateFloorPayload, IUseFloorUpdate } from '@/types'

export const useRentoraUpdateFloor = (props: { buildingId: string; floorId: string }): IUseFloorUpdate => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  const queryClient = useQueryClient()
  return useMutation<void, Error, IUpdateFloorPayload>({
    mutationKey: [rentoraApiExecuteClient.key.updateFloor],
    mutationFn: (payload: IUpdateFloorPayload) => rentoraApiExecuteClient.updateFloor(props.buildingId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [rentoraApiQueryClient.key.floorList, props.buildingId],
      })
    },
  })
}
