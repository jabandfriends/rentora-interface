import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { useMemo } from 'react'

import { RENTORA_API_BASE_URL } from '@/config'
import { DEFAULT_MONTHLY_INVOICE_DATA, DEFAULT_MONTHLY_INVOICE_METADATA } from '@/constants'
import { RentoraApiQueryClient } from '@/hooks/client'
import type {
  IRentoraApiClientMonthlyInvoiceListResponse,
  IRentoraApiMonthlyInvoiceListParams,
  IUseMonthlyInvoiceList,
  Maybe,
} from '@/types'

export const useRentoraMonthlyInvoiceList = (
  apartmentId: Maybe<string>,
  params: IRentoraApiMonthlyInvoiceListParams,
): IUseMonthlyInvoiceList => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  const { data: rawData, ...rest }: UseQueryResult<IRentoraApiClientMonthlyInvoiceListResponse['data']> = useQuery({
    queryKey: [
      rentoraApiQueryClient.key.monthlyInvoiceList,
      apartmentId,
      params.page,
      params.size,
      params.sortBy,
      params.sortDir,
      params.unitName,
      params.buildingName,
      params.paymentStatus,
      params.genMonth,
    ],
    queryFn: () =>
      rentoraApiQueryClient.monthlyInvoiceList(apartmentId, {
        ...(params?.unitName ? { unitName: params.unitName } : {}),
        ...(params?.buildingName ? { buildingName: params.buildingName } : {}),
        ...(params?.paymentStatus ? { paymentStatus: params.paymentStatus } : {}),
        ...(params?.sortBy ? { sortBy: params.sortBy } : {}),
        ...(params?.sortDir ? { sortDir: params.sortDir } : {}),
        genMonth: params.genMonth,
        page: params.page,
        size: params.size,
      }),
    retry: 1,
    enabled: !!apartmentId && !!params.genMonth,
  })

  const result: IRentoraApiClientMonthlyInvoiceListResponse['data'] = useMemo(() => {
    return {
      data: rawData?.data ?? ([] as IRentoraApiClientMonthlyInvoiceListResponse['data']['data']),
      pagination: rawData?.pagination ?? DEFAULT_MONTHLY_INVOICE_DATA,
      metadata: rawData?.metadata ?? DEFAULT_MONTHLY_INVOICE_METADATA,
    }
  }, [rawData])

  return {
    ...rest,
    ...result,
  } as IUseMonthlyInvoiceList
}
