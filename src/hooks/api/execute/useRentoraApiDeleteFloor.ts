import { useMutation } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks'

export const useRentoraApiDeleteFloor = () => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)

  return useMutation<void, Error, string, unknown>({
    mutationFn: (floorId: string) => rentoraApiExecuteClient.deleteFloor(floorId),
  })
}
