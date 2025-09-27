import { useMutation } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks'
import type { ICreateTenantRequestPayload, IUseRentoraApiTenantCreate, Maybe } from '@/types'

export const useRentoraApiTenantCreate = ({
  apartmentId,
}: {
  apartmentId: Maybe<string>
}): IUseRentoraApiTenantCreate => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  return useMutation<void, Error, ICreateTenantRequestPayload>({
    mutationKey: [rentoraApiExecuteClient.key.createTenant, apartmentId],
    mutationFn: async (payload: ICreateTenantRequestPayload) => {
      return await rentoraApiExecuteClient.createTenant(apartmentId!, payload)
    },
  })
}
