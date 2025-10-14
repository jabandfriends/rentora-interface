import { useMutation } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks'
import type { IUpdateUnitServiceRequestPayload, IUseUpdateUtilityService } from '@/types'

export const useRentoraApiUpdateUtility = (props: { apartmentId: string }): IUseUpdateUtilityService => {
  const rentoraExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)

  return useMutation<void, Error, IUpdateUnitServiceRequestPayload>({
    mutationKey: [rentoraExecuteClient.key.updateUnitService, props.apartmentId],
    mutationFn: (payload: IUpdateUnitServiceRequestPayload) =>
      rentoraExecuteClient.updateUtilityService(props.apartmentId, payload),
  })
}
