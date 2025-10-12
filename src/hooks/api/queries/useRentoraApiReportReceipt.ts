import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { DEFAULT_REPORT_RECEIPT_LIST_DATA, DEFAULT_REPORT_RECEIPT_LIST_METADATA } from '@/constants'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraApiReportReceiptListParams,
  IReportReceiptListData,
  IUseRentoraApiReportReceiptList,
  Maybe,
} from '@/types'

export const useRentoraApiReportReceipt = (props: {
  enabled?: boolean
  apartmentId: Maybe<string>
  params: IRentoraApiReportReceiptListParams
}): IUseRentoraApiReportReceiptList => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  const { data: rawData, ...rest }: UseQueryResult<IReportReceiptListData> = useQuery({
    queryKey: [
      rentoraApiQueryClient.key.reportReceiptList,
      props?.apartmentId,
      props?.params.page,
      props?.params.size,
      props?.params.sortBy,
      props?.params.sortDir,
      props?.params.search,
    ],
    queryFn: async (): Promise<IReportReceiptListData> => {
      const { page, size, sortBy, sortDir, search }: IRentoraApiReportReceiptListParams = props?.params ?? {}

      const res = await rentoraApiQueryClient.reportReceiptList(props?.apartmentId, {
        ...(props?.params ?? {}),
        ...(page ? { page } : {}),
        ...(size ? { size } : {}),
        ...(sortBy ? { sortBy } : {}),
        ...(sortDir ? { sortDir } : {}),
        ...(search ? { search } : {}),
      })
      return res.data as unknown as IReportReceiptListData
    },
    retry: 1,
    enabled: props?.enabled,
  })
  return {
    ...rest,
    data: rawData?.data ?? [],
    pagination: rawData?.pagination ?? DEFAULT_REPORT_RECEIPT_LIST_DATA,
    metadata: rawData?.metadata ?? DEFAULT_REPORT_RECEIPT_LIST_METADATA,
  } as IUseRentoraApiReportReceiptList
}
