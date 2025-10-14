import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks/client'
import type {
  ICreateAdhocInvoiceRequestPayload,
  IRentoraApiClientCreateAdhocInvoiceResponse,
  IUseRentoraApiCreateAdhocInvoice,
} from '@/types'

export const useRentoraApiCreateAdhocInvoice = (): IUseRentoraApiCreateAdhocInvoice => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)

  return useMutation<
    IRentoraApiClientCreateAdhocInvoiceResponse['data'],
    AxiosError,
    { apartmentId: string; payload: ICreateAdhocInvoiceRequestPayload }
  >({
    mutationKey: [rentoraApiExecuteClient.key.createAdhocInvoice],
    mutationFn: async ({ apartmentId, payload }): Promise<IRentoraApiClientCreateAdhocInvoiceResponse['data']> => {
      const response: IRentoraApiClientCreateAdhocInvoiceResponse['data'] =
        await rentoraApiExecuteClient.createAdhocInvoice(apartmentId, payload)
      return response
    },
  })
}
