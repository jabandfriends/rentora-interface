import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import { type IRentoraApiClientContractDetailResponse, type IUseRentoraApiContractDetail } from '@/types'

export const useRentoraApiContractDetail = (props: {
  apartmentId: string
  unitId: string
}): IUseRentoraApiContractDetail => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  return useQuery<IRentoraApiClientContractDetailResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.contractDetail, props?.apartmentId, props?.unitId],
    queryFn: async () => {
      return await rentoraApiQueryClient.contractDetail(props?.apartmentId, props?.unitId)
    },
    retry: 1,
    enabled: !!props?.apartmentId && !!props?.unitId,
  })
}
