import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks/client/RentoraApiQueryClient'
import type {
  IRentoraApiClientUnitServiceResponse,
  IRentoraApiUnitServiceParams,
  IUseRentoraApiUnitServices,
} from '@/types'

export const useRentoraApiUnitServiceList = (props: IRentoraApiUnitServiceParams): IUseRentoraApiUnitServices => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  return useQuery<IRentoraApiClientUnitServiceResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.unitServicesList, props.unitId],
    queryFn: () => rentoraApiQueryClient.unitServicesList(props.unitId),
    retry: 1,
    enabled: !!props.unitId,
  })
}
