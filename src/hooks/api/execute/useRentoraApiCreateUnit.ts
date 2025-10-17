import { useMutation } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks'
import type { ICreateUnitRequestPayload, IUseCreateUnit } from '@/types'

export const useRentoraApiCreateUnit = (props: { apartmentId: string }): IUseCreateUnit => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)

  return useMutation<void, Error, ICreateUnitRequestPayload>({
    mutationKey: [rentoraApiExecuteClient.key.createUnit, props.apartmentId],
    mutationFn: (payload: ICreateUnitRequestPayload) => rentoraApiExecuteClient.createUnit(props.apartmentId, payload),
  })
}
