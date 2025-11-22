import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient, RentoraApiQueryClient } from '@/hooks/client'
import { type IInviteUserPayload, type IUseRentoraInviteUser } from '@/types'
import { getErrorMessage } from '@/utilities'

export const useRentoraInviteUser = (props: { apartmentId: string }): IUseRentoraInviteUser => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  const queryClient: QueryClient = useQueryClient()
  return useMutation<void, Error, IInviteUserPayload>({
    mutationKey: [rentoraApiExecuteClient.key.inviteUser, props.apartmentId],
    mutationFn: (payload: IInviteUserPayload) => rentoraApiExecuteClient.inviteUser(props.apartmentId, payload),
    onSuccess: () => {
      toast.success('Invite user successfully')
      queryClient.invalidateQueries({
        queryKey: [rentoraApiQueryClient.key.tenantList],
        exact: false,
      })
    },
    onError: (error: Error) => {
      toast.error(getErrorMessage(error))
    },
  })
}
