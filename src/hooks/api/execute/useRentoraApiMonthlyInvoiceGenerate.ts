import { useMutation } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks'
import type { IGenerateMonthlyInvoiceRequestPayload, IUseGenerateMonthlyInvoice } from '@/types'

export const useRentoraApiMonthlyInvoiceGenerate = (): IUseGenerateMonthlyInvoice => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)

  return useMutation<void, Error, IGenerateMonthlyInvoiceRequestPayload>({
    mutationKey: [rentoraApiExecuteClient.key.generateMonthlyInvoice],
    mutationFn: async (payload: IGenerateMonthlyInvoiceRequestPayload): Promise<void> => {
      await rentoraApiExecuteClient.generateMonthlyInvoice(payload)
    },
  })
}
