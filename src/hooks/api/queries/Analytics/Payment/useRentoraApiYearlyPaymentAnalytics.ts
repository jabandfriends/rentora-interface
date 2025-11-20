import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import type { IRentoraApiClientPaymentYearlySummaryResponse, IUseRentoraApiPaymentYearlySummary, Maybe } from '@/types'

export const useRentoraApiYearlyPaymentAnalytics = (props: {
  apartmentId: Maybe<string>
}): IUseRentoraApiPaymentYearlySummary => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  return useQuery<IRentoraApiClientPaymentYearlySummaryResponse['data']>({
    queryKey: [props.apartmentId, rentoraApiQueryClient.key.yearlyPaymentAnalytics],
    queryFn: () => rentoraApiQueryClient.yearlyPaymentAnalytics(props.apartmentId),
    enabled: !!props.apartmentId,
  })
}
