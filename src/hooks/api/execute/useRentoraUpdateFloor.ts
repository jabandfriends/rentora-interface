import { useMutation } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks'
import type { IUpdateFloorPayload, IUseFloorUpdate } from '@/types'

export const useRentoraUpdateFloor = (props: { buildingId: string }): IUseFloorUpdate => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)

  return useMutation<void, Error, IUpdateFloorPayload>({
    mutationKey: [rentoraApiExecuteClient.key.updateFloor],
    mutationFn: (payload: IUpdateFloorPayload) => rentoraApiExecuteClient.updateFloor(props.buildingId, payload),
  })
}
