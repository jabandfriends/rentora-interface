import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import {
  type IRentoraApiClientContractDetailResponse,
  type IUseRentoraApiContractDetail,
  type IUseRentoraApiContractTerminateParams,
} from '@/types'

export const useRentoraApiContractDetail = (
  props: IUseRentoraApiContractTerminateParams,
): IUseRentoraApiContractDetail => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  return useQuery<IRentoraApiClientContractDetailResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.contractDetail, props.apartmentId, props.unitId],
    queryFn: async () => {
      try {
        return await rentoraApiQueryClient.contractDetail(props?.apartmentId, props?.unitId)
        //eslint-disable-next-line
      } catch (error) {
        return null
      }
    },
    retry: 1,
    enabled: !!props?.apartmentId && !!props?.unitId,
  })
}
