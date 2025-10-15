import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import type { IRentoraApiClientMonthlyInvoiceDetailResponse, IUseMonthlyInvoiceDetail, Maybe } from '@/types'

export const useRentoraApiMonthlyInvoiceDetail = (props: {
  invoiceNumber: Maybe<string>
}): IUseMonthlyInvoiceDetail => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  return useQuery<IRentoraApiClientMonthlyInvoiceDetailResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.monthlyInvoiceDetail],
    queryFn: async () => {
      return await rentoraApiQueryClient.monthlyInvoiceDetail(props.invoiceNumber!)
    },
    enabled: !!props?.invoiceNumber,
    retry: 1,
  })
}
