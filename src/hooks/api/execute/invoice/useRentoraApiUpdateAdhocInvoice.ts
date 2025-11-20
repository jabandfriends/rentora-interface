import { useMutation, useQueryClient } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient, RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraBaseApiClientUpdateAdhocInvoiceResponse,
  IUpdateAdhocInvoicePayload,
  IUseRentoraApiUpdateAdhocInvoice,
} from '@/types'

export const useRentoraApiUpdateAdhocInvoice = (params: { apartmentId: string }): IUseRentoraApiUpdateAdhocInvoice => {
  const rentoraExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  const rentoraQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  const queryClient = useQueryClient()

  return useMutation<void, Error, IUpdateAdhocInvoicePayload>({
    mutationKey: [rentoraExecuteClient.key.adhocInvoiceUpdate],
    mutationFn: async (payload: IUpdateAdhocInvoicePayload) => {
      const { receiptFile, ...rest } = payload

      const sentPayload = {
        ...rest,
      }
      const result: IRentoraBaseApiClientUpdateAdhocInvoiceResponse['data'] =
        await rentoraExecuteClient.updateAdhocInvoice(params.apartmentId, sentPayload)

      if (!receiptFile) return
      if (!result.presignedUrl) return

      await rentoraExecuteClient.putPresignedUrl({
        imgFile: receiptFile,
        presignedUrl: result.presignedUrl,
      })
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [rentoraQueryClient.key.invoiceList],
        exact: false,
      })
    },
  })
}
