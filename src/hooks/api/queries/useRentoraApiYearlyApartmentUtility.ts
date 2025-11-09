import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraApiClietYearlyApartmentResponse,
  IUseRentoraApiYearlyApartment,
} from '@/types/hooks/api/query/apartment-utility'

export const useRentoraApiYearlyApartmentUtility = (props: { apartmentId: string }): IUseRentoraApiYearlyApartment => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  return useQuery<IRentoraApiClietYearlyApartmentResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.yearlyApartmentUtility, props.apartmentId],
    queryFn: () => rentoraApiQueryClient.yearlyApartmentUtility(props.apartmentId),
    enabled: !!props.apartmentId,
  })
}
