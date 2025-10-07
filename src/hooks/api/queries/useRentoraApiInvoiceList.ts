import type { UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { RENTORA_API_BASE_URL } from '@/config'
import { DEFAULT_INVOICE_LIST_DATA, DEFAULT_INVOICE_LIST_METADATA } from '@/constants'
import { RentoraApiQueryClient } from '@/hooks/client'
import type {
  IRentoraApiClientInvoiceListResponse,
  IRentoraApiInvoiceListParams,
  IUseRentoraApiInvoiceList,
  Maybe,
} from '@/types'

export const useRentoraApiInvoiceList = (props: {
  apartmentId: Maybe<string>
  params: IRentoraApiInvoiceListParams
}): IUseRentoraApiInvoiceList => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  const { data: rawData, ...rest }: UseQueryResult<IRentoraApiClientInvoiceListResponse['data']> = useQuery({
    queryKey: [
      rentoraApiQueryClient.key.invoiceList,
      props?.apartmentId,
      props?.params?.page,
      props?.params?.size,
      props?.params?.search,
      props?.params?.status,
      props?.params?.name,
      props?.params?.sortBy,
      props?.params?.sortDir,
    ],
    queryFn: async () => {
      const { page, size, search, status, name, sortBy, sortDir }: IRentoraApiInvoiceListParams = props?.params ?? {}
      return await rentoraApiQueryClient.invoiceList(props?.apartmentId, {
        ...(props?.params ?? {}),
        ...(status ? { status } : {}),
        ...(name ? { name } : {}),
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

  const result: IRentoraApiClientInvoiceListResponse['data'] = useMemo(() => {
    return {
      data: rawData?.data ?? ([] as IRentoraApiClientInvoiceListResponse['data']['data']),
      pagination: rawData?.pagination ?? DEFAULT_INVOICE_LIST_DATA,
      metadata: rawData?.metadata ?? DEFAULT_INVOICE_LIST_METADATA,
    }
  }, [rawData])

  return {
    ...rest,
    ...result,
  } as IUseRentoraApiInvoiceList
}
