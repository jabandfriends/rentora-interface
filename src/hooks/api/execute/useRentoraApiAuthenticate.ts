import { useMutation } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks/client'
import { type IAuthRequest, type IRentoraApiClientAuthenticateResponse, type IUseRentoraApiAuthenticate } from '@/types'

export const useRentoraApiAuthenticate = (): IUseRentoraApiAuthenticate => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)

  return useMutation<IRentoraApiClientAuthenticateResponse['data'], Error, IAuthRequest>({
    mutationKey: [rentoraApiExecuteClient.key.authenticate],
    mutationFn: async (payload: IAuthRequest): Promise<IRentoraApiClientAuthenticateResponse['data']> => {
      return await rentoraApiExecuteClient.authenticate(payload)
    },
  })
}
