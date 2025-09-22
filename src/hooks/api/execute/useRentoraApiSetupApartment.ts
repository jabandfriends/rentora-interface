import { useMutation } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks'
import type { ISetupApartmentRequestPayload, IUseRentoraApiSetupApartment } from '@/types'

export const useRentoraApiSetupApartment = (): IUseRentoraApiSetupApartment => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  return useMutation<void, Error, ISetupApartmentRequestPayload>({
    mutationKey: [rentoraApiExecuteClient.key.setupApartment],
    mutationFn: async (payload: ISetupApartmentRequestPayload) => {
      return await rentoraApiExecuteClient.setupApartment(payload)
    },
  })
}
