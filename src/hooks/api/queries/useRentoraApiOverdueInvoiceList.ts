import type { UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { RENTORA_API_BASE_URL } from '@/config'
import { DEFAULT_OVERDUE_INVOICE_LIST_DATA, DEFAULT_OVERDUE_INVOICE_LIST_METADATA } from '@/constants'
import { RentoraApiQueryClient } from '@/hooks/client'
import type {
  IRentoraApiClientOverdueInvoiceListResponse,
  IRentoraApiOverdueInvoiceListParams,
  IUseRentoraApiOverdueInvoiceList,
  Maybe,
} from '@/types'

export const useRentoraApiOverdueInvoiceList = (props: {
  apartmentId: Maybe<string>
  params: IRentoraApiOverdueInvoiceListParams
}): IUseRentoraApiOverdueInvoiceList => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  const { data: rawData, ...rest }: UseQueryResult<IRentoraApiClientOverdueInvoiceListResponse['data']> = useQuery({
    queryKey: [
      rentoraApiQueryClient.key.overdueInvoiceList,
      props?.apartmentId,
      props?.params?.page,
      props?.params?.size,
      props?.params?.search,
      props?.params?.sortBy,
      props?.params?.sortDir,
    ],
    queryFn: async () => {
      const { page, size, search, sortBy, sortDir }: IRentoraApiOverdueInvoiceListParams = props?.params ?? {}
      return await rentoraApiQueryClient.overdueInvoiceList(props?.apartmentId, {
        ...(props?.params ?? {}),
        ...(search ? { search } : {}),
        ...(sortBy ? { sortBy } : {}),
        ...(sortDir ? { sortDir } : {}),
        page,
        size,
      })
    },
    retry: 1,
    enabled: !!props?.apartmentId,
  })

  const result: IRentoraApiClientOverdueInvoiceListResponse['data'] = useMemo(() => {
    return {
      data: rawData?.data ?? ([] as IRentoraApiClientOverdueInvoiceListResponse['data']['data']),
      pagination: rawData?.pagination ?? DEFAULT_OVERDUE_INVOICE_LIST_DATA,
      metadata: rawData?.metadata ?? DEFAULT_OVERDUE_INVOICE_LIST_METADATA,
    }
  }, [rawData])

  return {
    ...rest,
    ...result,
  } as IUseRentoraApiOverdueInvoiceList
}
