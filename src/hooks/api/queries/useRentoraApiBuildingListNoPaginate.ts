import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import type { IRentoraApiClientBuildingListResponse, IUseRentoraApiClientBuildingListResponse, Maybe } from '@/types'

export const useRentoraApiBuildingListNoPaginate = (props: {
  apartmentId: Maybe<string>
}): IUseRentoraApiClientBuildingListResponse => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  return useQuery<IRentoraApiClientBuildingListResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.buildingListNoPaginate, props.apartmentId],
    queryFn: () => {
      return rentoraApiQueryClient.buildingListNoPaginate(props.apartmentId)
    },
    retry: 1,
    enabled: !!props.apartmentId,
  })
}
