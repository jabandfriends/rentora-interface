import { useMutation } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks'
import { type IMeterReadingRequestPayload, type IUseRentoraApiCreateMeterReading, type Maybe } from '@/types'

export const useRentoraApiUnitUtilityCreateMeterReading = (props: {
  apartmentId: Maybe<string>
}): IUseRentoraApiCreateMeterReading => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)

  return useMutation<void, Error, IMeterReadingRequestPayload>({
    mutationKey: [rentoraApiExecuteClient.key.createMeterReading],
    mutationFn: async (payload: IMeterReadingRequestPayload): Promise<void> => {
      return await rentoraApiExecuteClient.createMeterReading(props.apartmentId!, payload)
    },
  })
}
