import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraApiApartmentServiceParams,
  IRentoraApiClientApartmentServiceResponse,
  IUseRentoraApiApartmentServices,
} from '@/types'

export const useRentoraApartmentServices = (
  props: IRentoraApiApartmentServiceParams,
): IUseRentoraApiApartmentServices => {
  const rentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  return useQuery<IRentoraApiClientApartmentServiceResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.apartmentServicesList, props.apartmentId, props.unitId],
    queryFn: async () => await rentoraApiQueryClient.apartmentServicesList(props.apartmentId, props.unitId),
    enabled: !!props.apartmentId && !!props.unitId,
  })
}
