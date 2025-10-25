import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks/client'
import type {
  ImonthlyUtilityUnitParams,
  IRentoraApiClietMonthlyUtilityUnitResponse,
  IUseRentoraApiMonthlyUtilityUnit,
} from '@/types/hooks/api/query/monthlyUitlityUnit'

export const useRentoraApiMonthlyUtilityUnit = (props: ImonthlyUtilityUnitParams): IUseRentoraApiMonthlyUtilityUnit => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  return useQuery<IRentoraApiClietMonthlyUtilityUnitResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.monthlyUtilityUnit, props.apartmentId, props.unitId],
    queryFn: () => rentoraApiQueryClient.monthlyUtilityUnit(props.apartmentId, props.unitId),
    retry: 1,
    enabled: !!props.apartmentId && !!props.unitId,
  })
}
