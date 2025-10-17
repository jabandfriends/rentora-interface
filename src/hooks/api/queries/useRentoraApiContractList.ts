import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { RENTORA_API_BASE_URL } from '@/config'
import { DEFAULT_CONTRACT_LIST_DATA } from '@/constants'
import { RentoraApiQueryClient } from '@/hooks/client'
import type {
  IRentoraApiClientContractListResponse,
  IRentoraApiContractListParams,
  IUseRentoraApiContractList,
  Maybe,
} from '@/types'

export const useRentoraApiContractList = (
  apartmentId: Maybe<string>,
  params: IRentoraApiContractListParams,
): IUseRentoraApiContractList => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  const { data: rawData, ...rest } = useQuery<
    IRentoraApiClientContractListResponse['data'],
    Error,
    IRentoraApiClientContractListResponse['data']
  >({
    queryKey: [
      rentoraApiQueryClient.key.contractList,
      apartmentId,
      params.unitId,
      params.contractStatus,
      params.page,
      params.size,
    ],
    queryFn: () => rentoraApiQueryClient.contractList(apartmentId, params),
  })

  const result: IRentoraApiClientContractListResponse['data'] = useMemo(() => {
    return {
      data: rawData?.data ?? ([] as IRentoraApiClientContractListResponse['data']['data']),
      pagination: rawData?.pagination ?? DEFAULT_CONTRACT_LIST_DATA,
    }
  }, [rawData])

  return {
    ...rest,
    ...result,
  } as IUseRentoraApiContractList
}
