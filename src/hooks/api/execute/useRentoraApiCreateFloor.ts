import { useMutation } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks'
import type { ICreateFloorRequestPayload, IUseFloorCreate } from '@/types'

export const useRentoraApiCreateFloor = (): IUseFloorCreate => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)

  return useMutation<void, Error, ICreateFloorRequestPayload>({
    mutationKey: [rentoraApiExecuteClient.key.createFloor],
    mutationFn: (payload: ICreateFloorRequestPayload) => rentoraApiExecuteClient.createFloor(payload),
  })
}
