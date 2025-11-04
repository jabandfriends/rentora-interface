import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IMonthlyUtilityBuldingParams,
  IRentoraApiClietMonthlyUtilityBuildingResponse,
  IUseRentoraApiMonthlyUtilityBuilding,
} from '@/types'

export const useRentoraApiMonthlyUtilityBuildings = (
  props: IMonthlyUtilityBuldingParams,
): IUseRentoraApiMonthlyUtilityBuilding => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  return useQuery<IRentoraApiClietMonthlyUtilityBuildingResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.monthlyUtilityBuilding, props.apartmentId],
    queryFn: () => rentoraApiQueryClient.monthlyUtilityBuilding({ apartmentId: props.apartmentId }),
    retry: 1,
    enabled: !!props.apartmentId,
  })
}
