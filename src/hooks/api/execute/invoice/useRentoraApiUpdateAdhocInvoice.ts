import { useMutation } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks'
import type {
  IRentoraBaseApiClientUpdateAdhocInvoiceResponse,
  IUpdateAdhocInvoicePayload,
  IUseRentoraApiUpdateAdhocInvoice,
} from '@/types'

export const useRentoraApiUpdateAdhocInvoice = (params: { apartmentId: string }): IUseRentoraApiUpdateAdhocInvoice => {
  const rentoraExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)

  return useMutation<IRentoraBaseApiClientUpdateAdhocInvoiceResponse['data'], Error, IUpdateAdhocInvoicePayload>({
    mutationKey: [rentoraExecuteClient.key.adhocInvoiceUpdate],
    mutationFn: (payload: IUpdateAdhocInvoicePayload) =>
      rentoraExecuteClient.updateAdhocInvoice(params.apartmentId, payload),
  })
}
