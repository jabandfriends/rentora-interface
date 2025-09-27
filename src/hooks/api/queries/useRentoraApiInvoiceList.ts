import type { UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { RENTORA_API_BASE_URL } from '@/config'
import { DEFAULT_INVOICE_LIST_DATA } from '@/constants'
import { RentoraApiQueryClient } from '@/hooks/client'
import type {
  IRentoraApiClientInvoiceListResponse,
  IRentoraApiInvoiceListParams,
  IUseRentoraApiInvoiceList,
} from '@/types'

export const useRentoraApiInvoiceList = (props: {
  params: IRentoraApiInvoiceListParams
}): IUseRentoraApiInvoiceList => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  const { data: rawData, ...rest }: UseQueryResult<IRentoraApiClientInvoiceListResponse['data']> = useQuery({
    queryKey: [
      rentoraApiQueryClient.key.invoiceList,
      props?.params?.page,
      props?.params?.size,
      props?.params?.search,
      props?.params?.sortBy,
      props?.params?.sortDir,
    ],
    queryFn: async () => {
      const { page, size, search, sortBy, sortDir }: IRentoraApiInvoiceListParams = props?.params ?? {}
      return await rentoraApiQueryClient.invoiceList({
        ...(props?.params ?? {}),
        ...(search ? { search } : {}),
        ...(sortBy ? { sortBy } : {}),
        ...(sortDir ? { sortDir } : {}),
        page,
        size,
      })
    },
    retry: 1,
  })

  const result: IRentoraApiClientInvoiceListResponse['data'] = useMemo(() => {
    return {
      data: rawData?.data ?? ([] as IRentoraApiClientInvoiceListResponse['data']['data']),
      pagination: rawData?.pagination ?? DEFAULT_INVOICE_LIST_DATA,
      ...rest,
    }
  }, [rawData, rest])

  return {
    ...rest,
    ...result,
  } as IUseRentoraApiInvoiceList
}
