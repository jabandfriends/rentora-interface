import { useMutation } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks/client'
import type { IUpdateUserRequestPayload, IUseRentoraApiUpdateUser } from '@/types'

export const useRentoraApiUpdateUser = (): IUseRentoraApiUpdateUser => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  return useMutation<void, Error, IUpdateUserRequestPayload>({
    mutationKey: [rentoraApiExecuteClient.key.updateUser],
    mutationFn: async (payload: IUpdateUserRequestPayload) => {
      return await rentoraApiExecuteClient.updateUser(payload)
    },
  })
}
