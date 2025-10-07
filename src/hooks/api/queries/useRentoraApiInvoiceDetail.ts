import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import type { IRentoraApiClientInvoiceDetailResponse, IUseRentoraApiInvoiceDetail, Maybe } from '@/types'

export const useRentoraApiInvoiceDetails = (props: {
  apartmentId: Maybe<string>
  adhocInvoiceId: Maybe<string>
}): IUseRentoraApiInvoiceDetail => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  return useQuery<IRentoraApiClientInvoiceDetailResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.invoiceDetail, props?.apartmentId, props?.adhocInvoiceId],
    queryFn: async () => {
      return await rentoraApiQueryClient.invoiceDetail(props?.apartmentId, props?.adhocInvoiceId)
    },
    retry: 1,
    enabled: Boolean(props?.apartmentId && props?.adhocInvoiceId),
  })
}
