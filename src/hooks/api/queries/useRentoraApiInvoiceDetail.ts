import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import type { IRentoraApiClientInvoiceDetailResponse, IUseRentoraApiInvoiceDetail, Maybe } from '@/types'

export const useRentoraApiInvoiceDetails = (props: { invoiceId: Maybe<string> }): IUseRentoraApiInvoiceDetail => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  return useQuery<IRentoraApiClientInvoiceDetailResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.invoiceDetail, props?.invoiceId],
    queryFn: async () => {
      return await rentoraApiQueryClient.invoiceDetail(props?.invoiceId)
    },
    retry: 1,
    enabled: !!props?.invoiceId,
  })
}
