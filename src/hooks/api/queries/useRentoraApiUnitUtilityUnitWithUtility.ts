import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks/client'
import type {
  IRentoraApiClientUnitWithUtilityResponse,
  IRentoraApiUnitWithUtilityParams,
  IUseRentoraApiUnitWithUtility,
  Maybe,
} from '@/types'

export const useRentoraApiUnitUtilityUnitWithUtility = (props: {
  apartmentId: Maybe<string>
  params: IRentoraApiUnitWithUtilityParams
  enabled?: boolean
}): IUseRentoraApiUnitWithUtility => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  return useQuery<IRentoraApiClientUnitWithUtilityResponse['data']>({
    queryKey: [props.apartmentId, rentoraApiQueryClient.key.unitWithUtility, props.params.buildingName],
    queryFn: () => rentoraApiQueryClient.unitWithUtility(props.apartmentId, props.params),
    enabled: props.enabled ?? true,
  })
}
