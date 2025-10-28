import { useMutation } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks/client'
import type { IUpdateMonthlyInvoiceRequest, IUseMonthlyInvoiceRequestPayload } from '@/types'

export const useRentoraApiUploadMonthlyInvoicePDF = (): IUseMonthlyInvoiceRequestPayload => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)

  return useMutation<void, Error, { invoiceNumber: string; file: File }>({
    mutationKey: [rentoraApiExecuteClient.key.updateMonthlyInvoice],
    mutationFn: async ({ invoiceNumber, file }): Promise<void> => {
      //get presigned url
      const response: IUpdateMonthlyInvoiceRequest['data'] =
        await rentoraApiExecuteClient.updateMonthlyInvoice(invoiceNumber)

      //upload file
      await rentoraApiExecuteClient.putPresignedUrl({
        presignedUrl: response.uploadUrl,
        imgFile: file,
      })
    },
  })
}
