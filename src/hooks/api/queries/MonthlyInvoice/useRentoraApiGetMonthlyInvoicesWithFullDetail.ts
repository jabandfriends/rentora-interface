import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraApiClientMonthlyInvoiceListWithFullDetailsResponse,
  IRentoraApiMonthlyInvoiceListWithFullDetailsParams,
  IUseMonthlyInvoiceListWithFullDetails,
} from '@/types'

export const useRentoraApiGetMonthlyInvoicesWithFullDetail = (props: {
  apartmentId: string
  params: IRentoraApiMonthlyInvoiceListWithFullDetailsParams
}): IUseMonthlyInvoiceListWithFullDetails => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  return useQuery<IRentoraApiClientMonthlyInvoiceListWithFullDetailsResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.monthlyInvoiceListWithFullDetails, props.params.genMonth],
    queryFn: async () => {
      return await rentoraApiQueryClient.monthlyInvoiceListWithFullDetails(props.apartmentId, props.params)
    },
    enabled: !!props.apartmentId && !!props.params.genMonth,
  })
}
