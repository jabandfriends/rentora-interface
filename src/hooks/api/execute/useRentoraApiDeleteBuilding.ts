import { useMutation, useQueryClient } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient, RentoraApiQueryClient } from '@/hooks'

export const useRentoraApiDeleteBuilding = (prop: { apartmentId: string }) => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  const queryClient = useQueryClient()
  return useMutation<void, Error, { buildingId: string }>({
    mutationKey: [rentoraApiExecuteClient.key.deleteBuilding, prop.apartmentId],
    mutationFn: ({ buildingId }: { buildingId: string }) =>
      rentoraApiExecuteClient.deleteBuilding(prop.apartmentId, buildingId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [rentoraApiQueryClient.key.buildingListNoPaginate, prop.apartmentId],
      })
    },
  })
}
