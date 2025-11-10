import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import type { IRentoraApiClientPaymentStatsSummaryResponse, IUseRentoraApiPaymentStatsSummary, Maybe } from '@/types'

export const useRentoraApiPaymentStatsSummary = (props: {
  apartmentId: Maybe<string>
}): IUseRentoraApiPaymentStatsSummary => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  return useQuery<IRentoraApiClientPaymentStatsSummaryResponse['data']>({
    queryKey: [props.apartmentId, rentoraApiQueryClient.key.paymentStatsSummary],
    queryFn: () => rentoraApiQueryClient.paymentStatsSummary(props.apartmentId),
    enabled: !!props.apartmentId,
  })
}
