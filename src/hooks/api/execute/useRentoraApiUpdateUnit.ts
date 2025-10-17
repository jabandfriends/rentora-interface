import { useMutation } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks'
import type { IUpdateUnitRequestPayload, IUseUpdateUnit } from '@/types'

export const useRentoraApiUpdateUnit = (props: { apartmentId: string; unitId: string }): IUseUpdateUnit => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)

  return useMutation<void, Error, IUpdateUnitRequestPayload>({
    mutationKey: [rentoraApiExecuteClient.key.updateUnit, props.apartmentId, props.unitId],
    mutationFn: (payload: IUpdateUnitRequestPayload) =>
      rentoraApiExecuteClient.updateUnit(props.apartmentId, props.unitId, payload),
  })
}
