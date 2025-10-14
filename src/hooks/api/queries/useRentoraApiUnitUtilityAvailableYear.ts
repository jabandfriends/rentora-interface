import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraApiClientUnitUtilityAvailableYearResponse,
  IUseRentoraApiUnitUtilityAvailableYear,
  Maybe,
} from '@/types'

export const useRentoraApiUnitUtilityAvailableYear = (props: {
  apartmentId: Maybe<string>
}): IUseRentoraApiUnitUtilityAvailableYear => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  return useQuery<IRentoraApiClientUnitUtilityAvailableYearResponse['data']>({
    queryKey: [props.apartmentId, rentoraApiQueryClient.key.unitUtilityAvailableYear],
    queryFn: () => rentoraApiQueryClient.unitUtilityAvailableYear(props.apartmentId),
    enabled: !!props.apartmentId,
  })
}
