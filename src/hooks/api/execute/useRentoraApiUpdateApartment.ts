import { useMutation } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks'
import type { IUpdateApartmentRequestPayload, IUseRentoraApiUpdateApartment } from '@/types'

export const useRentoraApiUpdateApartment = ({
  apartmentId,
}: {
  apartmentId: string
}): IUseRentoraApiUpdateApartment => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)

  return useMutation<void, Error, IUpdateApartmentRequestPayload>({
    mutationFn: async (payload: IUpdateApartmentRequestPayload) => {
      return await rentoraApiExecuteClient.updateApartment(apartmentId, payload)
    },
  })
}
