import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient, RentoraApiQueryClient } from '@/hooks'
import type {
  IUpdateApartmentPaymentServiceRequestPayload,
  IUpdateApartmentPaymentServiceResponse,
  IUseRentoraApiUpdateApartmentPaymentService,
} from '@/types'

export const useRentoraApiUpdateApartmentPayment = (): IUseRentoraApiUpdateApartmentPaymentService => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  const queryClient: QueryClient = useQueryClient()

  return useMutation<void, Error, IUpdateApartmentPaymentServiceRequestPayload>({
    mutationKey: [rentoraApiExecuteClient.key.updateApartmentPaymentService],
    mutationFn: async (payload: IUpdateApartmentPaymentServiceRequestPayload) => {
      const { promptPayImageFile, ...rest } = payload
      const result: IUpdateApartmentPaymentServiceResponse['data'] =
        await rentoraApiExecuteClient.updateApartmentPaymentService(payload.paymentId!, {
          ...rest,
          ...(promptPayImageFile && { promptPayFilename: promptPayImageFile.name }),
        })

      if (!promptPayImageFile) return
      if (!result.presignedUrl) return

      await rentoraApiExecuteClient.putPresignedUrl({
        imgFile: promptPayImageFile,
        presignedUrl: result.presignedUrl,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [rentoraApiQueryClient.key.apartmentPayment],
        exact: false,
      })
    },
  })
}
