import { useMutation } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks'
import type { IUpdateTenantPasswordRequestPayload, IUseRentoraApiTenantUpdatePassword, Maybe } from '@/types'

export const useRentoraApiTenantPasswordUpdate = ({
  userId,
}: {
  userId: Maybe<string>
}): IUseRentoraApiTenantUpdatePassword => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  return useMutation<void, Error, IUpdateTenantPasswordRequestPayload>({
    mutationKey: [rentoraApiExecuteClient.key.updateTenantPassword, userId],
    mutationFn: async (payload: IUpdateTenantPasswordRequestPayload) => {
      return await rentoraApiExecuteClient.updatePassword(userId!, payload)
    },
  })
}
