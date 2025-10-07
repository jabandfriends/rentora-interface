import { useMutation } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks'
import type { ICreateContractRequestPayload, IUseRentoraApiCreateContract, Maybe } from '@/types'

export const useRentoraApiCreateContract = (props: { apartmentId: Maybe<string> }): IUseRentoraApiCreateContract => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  return useMutation<void, Error, ICreateContractRequestPayload>({
    mutationFn: (payload: ICreateContractRequestPayload) =>
      rentoraApiExecuteClient.createContract(props.apartmentId!, payload),
  })
}
