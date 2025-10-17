import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks/client'
import type {
  IDeleteUnitServiceRequestParams,
  IRenotaApiDeleteUnitService,
  IRenotaApiDeleteUnitServicePayload,
} from '@/types'

export const useRentoraApiDeleteUnitService = (
  params: IDeleteUnitServiceRequestParams,
): IRenotaApiDeleteUnitService => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  const rentoraApiQueryClient = useQueryClient()
  const unitServiceList = 'UNIT_SERVICE_LIST'

  return useMutation<void, AxiosError, IRenotaApiDeleteUnitServicePayload>({
    mutationKey: [rentoraApiExecuteClient.key.deleteUnitService],
    mutationFn: async (payload: IRenotaApiDeleteUnitServicePayload): Promise<void> => {
      const response: void = await rentoraApiExecuteClient.deleteUnitService(
        params.apartmentId!,
        params.unitId!,
        payload.serviceId,
      )
      return response
    },

    onSuccess: () => {
      rentoraApiQueryClient.invalidateQueries({
        queryKey: [unitServiceList, params.apartmentId, params.unitId],
      })
    },
  })
}
