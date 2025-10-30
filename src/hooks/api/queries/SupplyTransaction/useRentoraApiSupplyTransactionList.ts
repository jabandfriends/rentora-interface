import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { useMemo } from 'react'

import { RENTORA_API_BASE_URL } from '@/config'
import { DEFAULT_SUPPLY_TRANSACTION_LIST_DATA } from '@/constants'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraApiClientSupplyTransactionListResponse,
  IRentoraApiSupplyTransactionListParams,
  IUseRentoraApiSupplyTransactionList,
  Maybe,
} from '@/types'

export const useRentoraApiSupplyTransactionList = (props: {
  apartmentId: Maybe<string>
  params: IRentoraApiSupplyTransactionListParams
}): IUseRentoraApiSupplyTransactionList => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  const { data: rawData, ...rest }: UseQueryResult<IRentoraApiClientSupplyTransactionListResponse['data']> = useQuery({
    queryKey: [
      rentoraApiQueryClient.key.supplyTransactionList,
      props?.apartmentId,
      props?.params?.page,
      props?.params?.size,
      props?.params?.supplyName,
      props?.params?.transactionType,
      props?.params?.sortBy,
      props?.params?.sortDir,
    ],
    queryFn: async () => {
      const { page, size, supplyName, transactionType, sortBy, sortDir }: IRentoraApiSupplyTransactionListParams =
        props?.params ?? {}
      return await rentoraApiQueryClient.supplyTransactionList(props?.apartmentId, {
        ...(props?.params ?? {}),
        ...(supplyName ? { supplyName } : {}),
        ...(transactionType ? { transactionType } : {}),
        ...(sortBy ? { sortBy } : {}),
        ...(sortDir ? { sortDir } : {}),
        page,
        size,
      })
    },
    retry: 1,
    enabled: !!props?.apartmentId,
  })

  const result: IRentoraApiClientSupplyTransactionListResponse['data'] = useMemo(() => {
    return {
      data: rawData?.data ?? ([] as IRentoraApiClientSupplyTransactionListResponse['data']['data']),
      pagination: rawData?.pagination ?? DEFAULT_SUPPLY_TRANSACTION_LIST_DATA,
    }
  }, [rawData])

  return {
    ...rest,
    ...result,
  } as IUseRentoraApiSupplyTransactionList
}
