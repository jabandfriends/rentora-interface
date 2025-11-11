import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IPaymentMonthlySummaryParam,
  IRentoraApiClientPaymentMonthlySummaryResponse,
  IUseRentoraApiPaymentMonthlySummary,
  Maybe,
} from '@/types'

export const useRentoraApiMonthlyPaymentAnalytic = (props: {
  apartmentId: Maybe<string>
  params: IPaymentMonthlySummaryParam
}): IUseRentoraApiPaymentMonthlySummary => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  return useQuery<IRentoraApiClientPaymentMonthlySummaryResponse['data']>({
    queryKey: [props.apartmentId, rentoraApiQueryClient.key.monthlyPaymentAnalytics, props.params.year],
    queryFn: () => rentoraApiQueryClient.monthlyPaymentAnalytics(props.apartmentId, props.params),
    enabled: !!props.apartmentId && !!props.params.year,
  })
}
