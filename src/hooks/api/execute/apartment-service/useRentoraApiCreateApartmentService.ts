import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient, RentoraApiQueryClient } from '@/hooks'
import type { ICreateApartmentServiceRequestPayload, IUseRentoraApiCreateApartmentService } from '@/types'

export const useRentoraApiCreateApartmentService = (apartmentId: string): IUseRentoraApiCreateApartmentService => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  const queryClient: QueryClient = useQueryClient()
  return useMutation<void, Error, ICreateApartmentServiceRequestPayload>({
    mutationKey: [rentoraApiExecuteClient.key.createApartmentService, apartmentId],
    mutationFn: (payload: ICreateApartmentServiceRequestPayload) =>
      rentoraApiExecuteClient.createApartmentService(apartmentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [rentoraApiQueryClient.key.apartmentServicesList],
        exact: false,
      })
    },
  })
}
