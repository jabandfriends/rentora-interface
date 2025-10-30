import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient, RentoraApiQueryClient } from '@/hooks'
import type { ISupplyDeletePayload, IUseRentoraApiDeleteSupply } from '@/types'

export const useRentoraApiDeleteSupply = (): IUseRentoraApiDeleteSupply => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  const queryClient: QueryClient = useQueryClient()
  return useMutation<void, Error, ISupplyDeletePayload>({
    mutationKey: [rentoraApiExecuteClient.key.deleteSupply],
    mutationFn: (payload: ISupplyDeletePayload) => rentoraApiExecuteClient.deleteSupply(payload.supplyId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [rentoraApiQueryClient.key.supplyList],
        exact: false,
      })
    },
  })
}
