import { useMutation } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks'
import type { IRentoraApiReadingContractResponse, IUseRentoraApiCreateReadingContract } from '@/types'

export const useRentoraApiCreateReadingContact = (): IUseRentoraApiCreateReadingContract => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  return useMutation<IRentoraApiReadingContractResponse['data'], Error, File>({
    mutationKey: [rentoraApiExecuteClient.key.createReadingContact],
    mutationFn: async (file: File): Promise<IRentoraApiReadingContractResponse['data']> => {
      return await rentoraApiExecuteClient.createReadingContact(file)
    },
  })
}
