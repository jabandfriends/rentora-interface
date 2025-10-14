import { useMutation, useQueryClient } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient, RentoraApiQueryClient } from '@/hooks'
import type { IMeterReadingUpdateRequestPayload, IUseRentoraApiUpdateMeterReading } from '@/types'

export const useRentoraApiUnitUtilityUpdateMeterReading = (props: {
  apartmentId: string
}): IUseRentoraApiUpdateMeterReading => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  const queryClient = useQueryClient()
  return useMutation<void, Error, IMeterReadingUpdateRequestPayload>({
    mutationFn: async (payload: IMeterReadingUpdateRequestPayload) => {
      return await rentoraApiExecuteClient.updateMeterReading(props.apartmentId, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [rentoraApiQueryClient.key.reportUtilityList],
      })
    },
  })
}
