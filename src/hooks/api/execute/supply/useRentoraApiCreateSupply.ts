import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient, RentoraApiQueryClient } from '@/hooks'
import type { ISupplyCreatePayload, IUseRentoraApiCreateSupply, Maybe } from '@/types'

export const useRentoraApiCreateSupply = (props: { apartmentId: Maybe<string> }): IUseRentoraApiCreateSupply => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  const queryClient: QueryClient = useQueryClient()
  return useMutation<void, Error, ISupplyCreatePayload>({
    mutationKey: [rentoraApiExecuteClient.key.createSupply, props.apartmentId],
    mutationFn: (payload: ISupplyCreatePayload) => rentoraApiExecuteClient.createSupply(props.apartmentId!, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [rentoraApiQueryClient.key.supplyList],
        exact: false,
      })
    },
  })
}
