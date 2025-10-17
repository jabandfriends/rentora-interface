import { useMutation, useQueryClient } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient, RentoraApiQueryClient } from '@/hooks'
import type { ICreateUnitRequestPayload, IUseCreateUnit } from '@/types'

export const useRentoraApiCreateUnit = (props: {
  buildingName: string
  floorId: string
  apartmentId: string
}): IUseCreateUnit => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  const queryClient = useQueryClient()
  return useMutation<void, Error, ICreateUnitRequestPayload>({
    mutationKey: [rentoraApiExecuteClient.key.createUnit, props.apartmentId, props.floorId, props.buildingName],
    mutationFn: (payload: ICreateUnitRequestPayload) => rentoraApiExecuteClient.createUnit(props.apartmentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [rentoraApiQueryClient.key.unitList],
        exact: false,
      })
    },
  })
}
