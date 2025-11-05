import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import type { IRentoraApiClientApartmentPaymentResponse, IUseRentoraApiApartmentPayment } from '@/types'

export const useRentoraApiGetApartmentPayment = (props: { apartmentId: string }): IUseRentoraApiApartmentPayment => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  return useQuery<IRentoraApiClientApartmentPaymentResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.apartmentPayment, props.apartmentId],
    queryFn: async () => {
      return await rentoraApiQueryClient.apartmentPayment(props.apartmentId)
    },
    enabled: !!props.apartmentId,
    retry: 1,
  })
}
