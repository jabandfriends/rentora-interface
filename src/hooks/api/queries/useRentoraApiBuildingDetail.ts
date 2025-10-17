import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import { type IRentoraApiClientBuildingDetailResponse, type IUseRentoraApiClientBuildingDetailResponse } from '@/types'

export const useRentoraApiBuildingDetail = (props: {
  apartmentId: string
  buildingId: string
}): IUseRentoraApiClientBuildingDetailResponse => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  return useQuery<IRentoraApiClientBuildingDetailResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.buildingDetail, props?.apartmentId, props?.buildingId],
    queryFn: () => rentoraApiQueryClient.buildingDetail(props?.apartmentId, props?.buildingId),
    retry: 1,
    enabled: !!props?.apartmentId && !!props?.buildingId,
  })
}
