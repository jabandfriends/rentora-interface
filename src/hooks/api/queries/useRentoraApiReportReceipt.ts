import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { RENTORA_API_BASE_URL } from '@/config'
import { DEFAULT_REPORT_RECEIPT_LIST_DATA, DEFAULT_REPORT_RECEIPT_LIST_METADATA } from '@/constants'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraApiClientReportReceiptListResponse,
  IRentoraApiReportReceiptListParams,
  IUseRentoraApiReportReceiptList,
  Maybe,
} from '@/types'

export const useRentoraApiReportReceipt = (props: {
  apartmentId: Maybe<string>
  params: IRentoraApiReportReceiptListParams
}): IUseRentoraApiReportReceiptList => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  const { data: rawData, ...rest } = useQuery({
    queryKey: [
      rentoraApiQueryClient.key.reportReceiptList,
      props?.apartmentId,
      props?.params.page,
      props?.params.size,
      props?.params.sortBy,
      props?.params.sortDir,
      props?.params.search,
    ],
    queryFn: async (): Promise<IRentoraApiClientReportReceiptListResponse['data']> => {
      const { page, size, sortBy, sortDir, search }: IRentoraApiReportReceiptListParams = props?.params ?? {}

      return await rentoraApiQueryClient.reportReceiptList(props?.apartmentId, {
        ...(props?.params ?? {}),
        ...(page ? { page } : {}),
        ...(size ? { size } : {}),
        ...(sortBy ? { sortBy } : {}),
        ...(sortDir ? { sortDir } : {}),
        ...(search ? { search } : {}),
      })
    },
    retry: 1,
    enabled: !!props?.apartmentId,
  })

  const result: IRentoraApiClientReportReceiptListResponse['data'] = useMemo(() => {
    return {
      data: rawData?.data ?? ([] as IRentoraApiClientReportReceiptListResponse['data']['data']),
      pagination: rawData?.pagination ?? DEFAULT_REPORT_RECEIPT_LIST_DATA,
      metadata: rawData?.metadata ?? DEFAULT_REPORT_RECEIPT_LIST_METADATA,
    }
  }, [rawData])

  return {
    ...rest,
    ...result,
  } as IUseRentoraApiReportReceiptList
}
