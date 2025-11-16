import { useMutation } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks'
import type { IReadingContact, IUseRentoraApiCreateReadingContact } from '@/types'

export const useRentoraApiCreateReadingContact = (): IUseRentoraApiCreateReadingContact => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  return useMutation<IReadingContact, Error, File>({
    mutationKey: [rentoraApiExecuteClient.key.createReadingContact],
    mutationFn: async (file: File): Promise<IReadingContact> => {
      return await rentoraApiExecuteClient.createReadingContact(file)
    },
  })
}
