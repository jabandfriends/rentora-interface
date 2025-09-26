import { useMutation } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks'
import type { IUpdateTenantRequestPayload, IUseRentoraApiTenantUpdate, Maybe } from '@/types'

export const useRentoraApiTenantUpdate = ({ userId }: { userId: Maybe<string> }): IUseRentoraApiTenantUpdate => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  return useMutation<void, Error, IUpdateTenantRequestPayload>({
    mutationKey: [rentoraApiExecuteClient.key.updateTenant, userId],
    mutationFn: async (payload: IUpdateTenantRequestPayload) => {
      return await rentoraApiExecuteClient.updateTenant(userId!, payload)
    },
  })
}
