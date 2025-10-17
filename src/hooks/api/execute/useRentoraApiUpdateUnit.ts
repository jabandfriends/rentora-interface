import { useMutation, useQueryClient } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient, RentoraApiQueryClient } from '@/hooks'
import type { IUpdateUnitRequestPayload, IUseUpdateUnit } from '@/types'

export const useRentoraApiUpdateUnit = (props: { apartmentId: string; unitId: string }): IUseUpdateUnit => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  const queryClient = useQueryClient()
  return useMutation<void, Error, IUpdateUnitRequestPayload>({
    mutationKey: [rentoraApiExecuteClient.key.updateUnit, props.apartmentId, props.unitId],
    mutationFn: (payload: IUpdateUnitRequestPayload) =>
      rentoraApiExecuteClient.updateUnit(props.apartmentId, props.unitId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [rentoraApiQueryClient.key.unitList],
        exact: false,
      })
    },
  })
}
