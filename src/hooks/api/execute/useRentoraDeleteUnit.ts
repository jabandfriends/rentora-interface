import { useMutation } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks'

export const useRentoraDeleteUnit = () => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)

  return useMutation<void, Error, { apartmentId: string; unitId: string }>({
    mutationKey: [rentoraApiExecuteClient.key.deleteUnit],
    mutationFn: ({ apartmentId, unitId }: { apartmentId: string; unitId: string }) =>
      rentoraApiExecuteClient.deleteUnit(apartmentId, unitId),
  })
}
