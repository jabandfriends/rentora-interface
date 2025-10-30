import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient, RentoraApiQueryClient } from '@/hooks'
import type { ISupplyUpdatePayload, IUseRentoraApiUpdateSupply } from '@/types'

export const useRentoraApiUpdateSupply = (): IUseRentoraApiUpdateSupply => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  const queryClient: QueryClient = useQueryClient()
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  return useMutation<void, Error, ISupplyUpdatePayload>({
    mutationKey: [rentoraApiExecuteClient.key.updateSupply],
    mutationFn: async (payload: ISupplyUpdatePayload) => {
      return await rentoraApiExecuteClient.updateSupply(payload.supplyId, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [rentoraApiQueryClient.key.supplyList],
        exact: false,
      })
    },
  })
}
