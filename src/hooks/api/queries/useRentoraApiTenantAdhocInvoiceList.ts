import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { useMemo } from 'react'

import { RENTORA_API_BASE_URL } from '@/config'
import { DEFAULT_INVOICE_LIST_DATA } from '@/constants'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraApiClientTenantAdhocInvoiceListResponse,
  IRentoraApiTenantAdhocInvoiceListParams,
  IUseRentoraApiTenantAdhocInvoiceList,
  Maybe,
} from '@/types'

export const useRentoraApiTenantAdhocInvoiceList = (props: {
  apartmentId: Maybe<string>
  tenantUserId: Maybe<string>
  params: IRentoraApiTenantAdhocInvoiceListParams
}): IUseRentoraApiTenantAdhocInvoiceList => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  const { data: rawData, ...rest }: UseQueryResult<IRentoraApiClientTenantAdhocInvoiceListResponse['data']> = useQuery({
    queryKey: [
      rentoraApiQueryClient.key.tenantAdhocInvoiceList,
      props?.apartmentId,
      props?.tenantUserId,
      props?.params?.page,
      props?.params?.size,
      props?.params?.sortBy,
      props?.params?.sortDir,
      props?.params?.status,
      props?.params?.category,
    ],

    queryFn: async () => {
      const { page, size, sortBy, sortDir, status, category }: IRentoraApiTenantAdhocInvoiceListParams =
        props?.params ?? {}

      return await rentoraApiQueryClient.tenantAdhocInvoiceList(props.apartmentId!, props.tenantUserId!, {
        ...(props?.params ?? {}),
        ...(sortBy ? { sortBy } : {}),
        ...(sortDir ? { sortDir } : {}),
        ...(status ? { status } : {}),
        ...(category ? { category } : {}),
        page,
        size,
      })
    },
    enabled: !!props?.apartmentId && !!props?.tenantUserId,
    retry: 1,
  })

  const result: IRentoraApiClientTenantAdhocInvoiceListResponse['data'] = useMemo(() => {
    return {
      data: rawData?.data ?? ([] as IRentoraApiClientTenantAdhocInvoiceListResponse['data']['data']),
      pagination: rawData?.pagination ?? DEFAULT_INVOICE_LIST_DATA,
    }
  }, [rawData])

  return {
    ...rest,
    ...result,
  } as IUseRentoraApiTenantAdhocInvoiceList
}
