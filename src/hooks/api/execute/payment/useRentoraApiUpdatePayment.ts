import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient, RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraApiClientUpdatePaymentResponse,
  IUpdatePaymentRequestPayload,
  IUseRentoraApiUpdatePayment,
} from '@/types'

export const useRentoraApiUpdatePayment = (): IUseRentoraApiUpdatePayment => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  const queryClient: QueryClient = useQueryClient()
  return useMutation<void, Error, IUpdatePaymentRequestPayload>({
    mutationKey: [rentoraApiExecuteClient.key.updatePayment],
    mutationFn: async (payload: IUpdatePaymentRequestPayload) => {
      const { paymentId, receiptFile, ...rest } = payload
      const result: IRentoraApiClientUpdatePaymentResponse['data'] = await rentoraApiExecuteClient.updatePayment(
        paymentId!,
        {
          ...rest,
          ...(receiptFile && { receiptFilename: receiptFile.name }),
        },
      )
      if (!result.presignedURL) return
      if (!receiptFile) return
      await rentoraApiExecuteClient.putPresignedUrl({
        imgFile: receiptFile,
        presignedUrl: result.presignedURL,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [rentoraApiQueryClient.key.paymentList],
        exact: false,
      })
      queryClient.invalidateQueries({
        queryKey: [rentoraApiQueryClient.key.tenantPayment],
        exact: false,
      })
    },
  })
}
