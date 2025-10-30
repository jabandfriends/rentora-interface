import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import type { IRentoraApiClientUnitDetailResponse, IUseRentoraApiUnitDetail } from '@/types'

export const useRentoraApiUnitDetail = (props: { apartmentId: string; unitId: string }): IUseRentoraApiUnitDetail => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  return useQuery<IRentoraApiClientUnitDetailResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.unitDetail, props.apartmentId, props.unitId],
    queryFn: () => rentoraApiQueryClient.unitDetail(props.apartmentId, props.unitId),
    enabled: !!props.apartmentId && !!props.unitId,
    retry: 1,
  })
}
