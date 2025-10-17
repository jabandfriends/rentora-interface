import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import { type IRentoraApiClientFloorListResponse, type IUseFloorListQuery } from '@/types'

export const useRentoraApiFloorList = (props: { buildingId: string }): IUseFloorListQuery => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  return useQuery<IRentoraApiClientFloorListResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.floorList],
    queryFn: () => rentoraApiQueryClient.floorList(props.buildingId),
    enabled: !!props.buildingId,
  })
}
