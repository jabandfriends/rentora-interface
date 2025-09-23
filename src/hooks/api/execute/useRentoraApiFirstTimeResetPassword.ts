import { useMutation } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks/client'
import type { IFirsttimePasswordResetRequestPayload, IUseRentoraApiFirstTimeResetPassword } from '@/types'

export const useRentoraApiFirstTimeResetPassword = (): IUseRentoraApiFirstTimeResetPassword => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)

  return useMutation<void, Error, IFirsttimePasswordResetRequestPayload>({
    mutationKey: [rentoraApiExecuteClient.key.firstTimePasswordReset],
    mutationFn: async (payload: IFirsttimePasswordResetRequestPayload): Promise<void> => {
      await rentoraApiExecuteClient.firstTimePasswordReset(payload)
    },
  })
}
