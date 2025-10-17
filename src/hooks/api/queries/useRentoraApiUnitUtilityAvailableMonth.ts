import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks/client'
import type {
  IRentoraApiClientUnitUtilityAvailableMonthResponse,
  IRentoraApiUnitUtilityAvailableMonthParams,
  IUseRentoraApiUnitUtilityAvailableMonth,
  Maybe,
} from '@/types'

export const useRentoraApiUnitUtilityAvailableMonth = (props: {
  apartmentId: Maybe<string>
  params: IRentoraApiUnitUtilityAvailableMonthParams
}): IUseRentoraApiUnitUtilityAvailableMonth => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  return useQuery<IRentoraApiClientUnitUtilityAvailableMonthResponse['data']>({
    queryKey: [
      props.apartmentId,
      rentoraApiQueryClient.key.unitUtilityAvailableMonth,
      props.params.year,
      props.params.buildingName,
    ],
    queryFn: () => rentoraApiQueryClient.unitUtilityAvailableMonth(props.apartmentId, props.params),
    enabled: !!props.apartmentId && !!props.params.year && !!props.params.buildingName,
  })
}
