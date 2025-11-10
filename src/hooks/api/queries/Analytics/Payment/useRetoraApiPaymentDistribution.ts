import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraApiClientPaymentDistributionSummaryResponse,
  IUseRentoraApiPaymentDistributionSummary,
  Maybe,
} from '@/types'

export const useRentoraApiPaymentDistribution = (props: {
  apartmentId: Maybe<string>
}): IUseRentoraApiPaymentDistributionSummary => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  return useQuery<IRentoraApiClientPaymentDistributionSummaryResponse['data']>({
    queryKey: [props.apartmentId, rentoraApiQueryClient.key.paymentDistributionSummary],
    queryFn: () => rentoraApiQueryClient.paymentDistributionSummary(props.apartmentId),
    enabled: !!props.apartmentId,
  })
}
