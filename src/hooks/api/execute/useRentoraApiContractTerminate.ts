import { useMutation, useQueryClient } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient, RentoraApiQueryClient } from '@/hooks'
import type {
  ITerminateContractRequestPayload,
  IUseRentoraApiContractTerminate,
  IUseRentoraApiContractTerminateParams,
} from '@/types'

export const useRentoraApiContractTerminate = (
  param: IUseRentoraApiContractTerminateParams,
): IUseRentoraApiContractTerminate => {
  const rentoraExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  const rentoraQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [rentoraExecuteClient.key.terminateContract, param.apartmentId, param.unitId],
    mutationFn: (payload: ITerminateContractRequestPayload) =>
      rentoraExecuteClient.terminateContract(param.apartmentId!, param.unitId!, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [rentoraQueryClient.key.contractDetail, param.apartmentId, param.unitId],
      })
    },
  })
}
