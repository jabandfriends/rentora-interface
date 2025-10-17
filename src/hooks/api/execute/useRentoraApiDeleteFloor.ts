import { useMutation, useQueryClient } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient, RentoraApiQueryClient } from '@/hooks'

export const useRentoraApiDeleteFloor = (props: { buildingId: string }) => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  const queryClient = useQueryClient()
  return useMutation<void, Error, string, unknown>({
    mutationKey: [rentoraApiExecuteClient.key.deleteFloor, props.buildingId],
    mutationFn: (floorId: string) => rentoraApiExecuteClient.deleteFloor(floorId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [rentoraApiQueryClient.key.floorList, props.buildingId],
      })
    },
  })
}
