import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { useMemo } from 'react'

import { RENTORA_API_BASE_URL } from '@/config'
import { DEFAULT_PAYMENT_LIST_DATA, DEFAULT_PAYMENT_LIST_METADATA } from '@/constants'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraApiClientPaymentListResponse,
  IRentoraApiPaymentListParams,
  IUseRentoraApiPaymentList,
} from '@/types'

export const useRentoraApiPaymentList = (props: {
  apartmentId: string
  params: IRentoraApiPaymentListParams
  enabled?: boolean
}): IUseRentoraApiPaymentList => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  const { data: rawData, ...rest }: UseQueryResult<IRentoraApiClientPaymentListResponse['data']> = useQuery({
    queryKey: [
      rentoraApiQueryClient.key.paymentList,
      props?.params?.page,
      props?.params?.size,
      props?.params?.search,
      props?.params?.sortBy,
      props?.params?.sortDir,
      props?.params?.status,
      props?.params?.buildingName,
    ],
    queryFn: async () => {
      const { page, size, search, sortBy, sortDir, status, buildingName }: IRentoraApiPaymentListParams =
        props?.params ?? {}
      return await rentoraApiQueryClient.paymentList(props?.apartmentId, {
        page,
        size,
        ...(search ? { search } : {}),
        ...(sortBy ? { sortBy } : {}),
        ...(sortDir ? { sortDir } : {}),
        ...(status ? { status } : {}),
        ...(buildingName ? { buildingName } : {}),
      })
    },
    retry: 1,
  })

  const result: IRentoraApiClientPaymentListResponse['data'] = useMemo(() => {
    return {
      data: rawData?.data ?? ([] as IRentoraApiClientPaymentListResponse['data']['data']),
      pagination: rawData?.pagination ?? DEFAULT_PAYMENT_LIST_DATA,
      metadata: rawData?.metadata ?? DEFAULT_PAYMENT_LIST_METADATA,
    }
  }, [rawData])

  return {
    ...rest,
    ...result,
  } as IUseRentoraApiPaymentList
}
