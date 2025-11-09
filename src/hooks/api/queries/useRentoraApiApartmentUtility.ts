import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks/client'
import type {
  IApartmentUtilityParams,
  IRentoraApiClietApartmentUtilityResponse,
  IUseRentoraApiApartmentUtility,
} from '@/types/hooks/api/query/apartment-utility'

export const useRentoraApiApartmetUtility = (props: {
  apartmentId: string
  params: IApartmentUtilityParams
}): IUseRentoraApiApartmentUtility => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  const { data: data, ...rest }: UseQueryResult<IRentoraApiClietApartmentUtilityResponse['data']> = useQuery({
    queryKey: [rentoraApiQueryClient.key.apartmentUtility, props.apartmentId, props?.params?.year],
    queryFn: async () => {
      return await rentoraApiQueryClient.apartmentUtility(props.apartmentId, {
        year: props.params.year,
      })
    },

    retry: 1,
    enabled: !!props.apartmentId && !!props.params.year,
  })

  return {
    ...rest,
    data,
  } as IUseRentoraApiApartmentUtility
}
