import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraApiApartmentServiceParams,
  IRentoraApiClientApartmentServiceResponse,
  IUseRentoraApiApartmentServices,
} from '@/types'

export const useRentoraApiApartmentServiceList = (
  props: IRentoraApiApartmentServiceParams,
): IUseRentoraApiApartmentServices => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  return useQuery<IRentoraApiClientApartmentServiceResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.apartmentServicesList, props.apartmentId],
    queryFn: () => rentoraApiQueryClient.apartmentServicesList(props.apartmentId),
    retry: 1,
    enabled: !!props.apartmentId,
  })
}
