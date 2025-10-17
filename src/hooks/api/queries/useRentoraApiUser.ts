import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import type { IRentoraApiClientUserResponse, IUseRentoraApiClientUserResponse } from '@/types'

export const useRentoraApiUser = (): IUseRentoraApiClientUserResponse => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  return useQuery<IRentoraApiClientUserResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.getUserData],
    queryFn: async () => {
      return await rentoraApiQueryClient.getUserData()
    },
    retry: 1,
  })
}
