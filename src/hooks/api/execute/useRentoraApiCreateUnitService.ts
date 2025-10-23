import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient, RentoraApiQueryClient } from '@/hooks'
import type {
  ICreateUnitServiceParams,
  ICreateUnitServiceRequestPayload,
  IUseRentoraApiCreateUnitService,
} from '@/types'

export const useRentoraApiCreateUnitService = (props: ICreateUnitServiceParams): IUseRentoraApiCreateUnitService => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  const queryClient: QueryClient = useQueryClient()

  return useMutation<void, AxiosError, ICreateUnitServiceRequestPayload>({
    mutationKey: [rentoraApiExecuteClient.key.createUnitService, props.unitId],
    mutationFn: async (payload: ICreateUnitServiceRequestPayload): Promise<void> => {
      const response: void = await rentoraApiExecuteClient.createUnitService(props.unitId, payload)
      queryClient.invalidateQueries({
        queryKey: [rentoraApiQueryClient.key.unitServicesList, props.unitId],
      })
      return response
    },
  })
}
