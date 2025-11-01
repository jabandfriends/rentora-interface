import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import {
  type IRentoraApiClientContractDetailResponse,
  type IUseRentoraApiContractDetail,
  type IUseRentoraApiContractDetailParams,
} from '@/types'

export const useRentoraApiContractDetailByContractId = (
  props: IUseRentoraApiContractDetailParams,
): IUseRentoraApiContractDetail => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  return useQuery<IRentoraApiClientContractDetailResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.contractDetailByContractId, props.apartmentId, props.contractId],
    queryFn: async () => {
      try {
        return await rentoraApiQueryClient.contractDetailByContractId(props?.apartmentId, props?.contractId)
        //eslint-disable-next-line
      } catch (error) {
        return null
      }
    },
    retry: 1,
    enabled: !!props?.apartmentId && !!props?.contractId,
  })
}
