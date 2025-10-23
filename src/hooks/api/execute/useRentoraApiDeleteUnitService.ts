import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient, RentoraApiQueryClient } from '@/hooks'
import type { IDeleteUnitServiceParams } from '@/types'

export const useRentoraApiDeleteUnitService = () => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  const queryClient: QueryClient = useQueryClient()
  return useMutation<void, Error, IDeleteUnitServiceParams>({
    mutationKey: [rentoraApiExecuteClient.key.deleteUnitService],
    mutationFn: (params: IDeleteUnitServiceParams) => rentoraApiExecuteClient.deleteUnitService(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [rentoraApiQueryClient.key.unitServicesList],
      })
    },
  })
}
