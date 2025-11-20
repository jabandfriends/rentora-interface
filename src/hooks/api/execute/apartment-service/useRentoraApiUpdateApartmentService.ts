import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient, RentoraApiQueryClient } from '@/hooks'
import type { IUpdateApartmentServiceRequestPayload, IUseRentoraApiUpdateApartmentService } from '@/types'

export const useRentoraApiUpdateApartmentService = (): IUseRentoraApiUpdateApartmentService => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  const queryClient: QueryClient = useQueryClient()
  return useMutation<void, Error, IUpdateApartmentServiceRequestPayload>({
    mutationKey: [rentoraApiExecuteClient.key.updateApartmentService],
    mutationFn: (payload: IUpdateApartmentServiceRequestPayload) =>
      rentoraApiExecuteClient.updateApartmentService(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [rentoraApiQueryClient.key.apartmentServicesList],
        exact: false,
      })
    },
  })
}
