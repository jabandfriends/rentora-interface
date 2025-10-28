import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IMonthlyUtilityUnitParams,
  IRentoraApiClietMonthlyUtilityUnitResponse,
  IUseRentoraApiMonthlyUtilityUnit,
} from '@/types'

export const useRentoraApiMonthlyUtilityUnit = (props: IMonthlyUtilityUnitParams): IUseRentoraApiMonthlyUtilityUnit => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  return useQuery<IRentoraApiClietMonthlyUtilityUnitResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.monthlyUtilityUnit, props.apartmentId, props.unitId],
    queryFn: () => rentoraApiQueryClient.monthlyUtilityUnit({ apartmentId: props.apartmentId, unitId: props.unitId }),
    retry: 1,
    enabled: !!props.apartmentId && !!props.unitId,
  })
}
