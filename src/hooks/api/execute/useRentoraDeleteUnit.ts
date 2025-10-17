import { useMutation, useQueryClient } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient, RentoraApiQueryClient } from '@/hooks'

export const useRentoraDeleteUnit = () => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  const queryClient = useQueryClient()
  return useMutation<void, Error, { apartmentId: string; unitId: string }>({
    mutationKey: [rentoraApiExecuteClient.key.deleteUnit],
    mutationFn: ({ apartmentId, unitId }: { apartmentId: string; unitId: string }) =>
      rentoraApiExecuteClient.deleteUnit(apartmentId, unitId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [rentoraApiQueryClient.key.unitList],
        exact: false,
      })
    },
  })
}
