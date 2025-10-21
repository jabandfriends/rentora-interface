import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient, RentoraApiQueryClient } from '@/hooks'
import type {
  ICreateUnitServiceRequestPayload,
  ICreateUnitServiceResponseParams,
  IUseRentoraApiCreateUnitService,
} from '@/types'

export const useRentoraApiCreateApartmentService = (
  params: ICreateUnitServiceResponseParams,
): IUseRentoraApiCreateUnitService => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  const queryClient: QueryClient = useQueryClient()

  return useMutation<void, AxiosError, ICreateUnitServiceRequestPayload>({
    mutationKey: [rentoraApiExecuteClient.key.createUnitService],
    mutationFn: async (payload: ICreateUnitServiceRequestPayload): Promise<void> => {
      const response: void = await rentoraApiExecuteClient.createUnitService(
        params.apartmentId!,
        params.unitId!,
        payload,
      )
      queryClient.invalidateQueries({
        queryKey: [rentoraApiQueryClient.key.unitServicesList, params.apartmentId, params.unitId],
      })
      return response
    },
  })
}
