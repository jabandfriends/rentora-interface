import { useMutation } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks/client'
import { type IRegisterPayload, type IUseRentoraApiRegister } from '@/types'

export const useRentoraUserRegister = (): IUseRentoraApiRegister => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  return useMutation<void, Error, IRegisterPayload>({
    mutationKey: [rentoraApiExecuteClient.key.register],
    mutationFn: (payload: IRegisterPayload) => rentoraApiExecuteClient.userRegister(payload),
  })
}
