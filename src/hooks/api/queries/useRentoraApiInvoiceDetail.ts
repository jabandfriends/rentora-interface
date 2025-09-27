import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import type { IRentoraApiInvoiceDetailParams, IUseRentoraApiInvoiceDetail } from '@/types'

export const useRentoraApiInvoiceDetails = (props: IRentoraApiInvoiceDetailParams): IUseRentoraApiInvoiceDetail => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  return useQuery({
    queryKey: [rentoraApiQueryClient.key.invoiceDetail, props?.invoiceId],
    queryFn: async () => {
      return await rentoraApiQueryClient.invoiceDetail({ invoiceId: props?.invoiceId })
    },
  })
}
