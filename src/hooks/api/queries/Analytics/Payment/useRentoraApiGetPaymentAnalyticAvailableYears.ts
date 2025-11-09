import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import type { IRentoraApiClientPaymentAvailableYearResponse, IUseRentoraApiPaymentAvailableYear, Maybe } from '@/types'

export const useRentoraApiGetPaymentAnalyticAvailableYears = (props: {
  apartmentId: Maybe<string>
}): IUseRentoraApiPaymentAvailableYear => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  return useQuery<IRentoraApiClientPaymentAvailableYearResponse['data']>({
    queryKey: [props.apartmentId, rentoraApiQueryClient.key.paymentAvailableYear],
    queryFn: () => rentoraApiQueryClient.paymentAvailableYear(props.apartmentId),
    enabled: !!props.apartmentId,
  })
}
