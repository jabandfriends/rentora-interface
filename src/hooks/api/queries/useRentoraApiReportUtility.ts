import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { useMemo } from 'react'

import { RENTORA_API_BASE_URL } from '@/config'
import { DEFAULT_REPORT_UTILITY_LIST_DATA, DEFAULT_REPORT_UTILITY_LIST_METADATA } from '@/constants'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraApiClientReportUtilityListResponse,
  IRentoraApiReportUtilityListParams,
  IUseRentoraApiReportUtilityList,
  Maybe,
} from '@/types'

export const useRentoraApiReportUtility = (props: {
  enabled?: boolean
  apartmentId: Maybe<string>
  params: IRentoraApiReportUtilityListParams
}): IUseRentoraApiReportUtilityList => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  const { data: rawData, ...rest }: UseQueryResult<IRentoraApiClientReportUtilityListResponse['data']> = useQuery({
    queryKey: [
      rentoraApiQueryClient.key.reportUtilityList,
      props?.apartmentId,
      props?.params.page,
      props?.params.size,
      props?.params.unitName,
      props?.params.sortBy,
      props?.params.sortDir,
      props?.params.readingDate,
    ],
    queryFn: async () => {
      const { page, size, unitName, sortBy, sortDir, readingDate }: IRentoraApiReportUtilityListParams =
        props?.params ?? {}
      return await rentoraApiQueryClient.reportUtilityList(props?.apartmentId, {
        ...(props?.params ?? {}),
        ...(page ? { page } : {}),
        ...(size ? { size } : {}),
        ...(unitName ? { unitName } : {}),
        ...(sortBy ? { sortBy } : {}),
        ...(sortDir ? { sortDir } : {}),
        ...(readingDate ? { readingDate } : {}),
      })
    },
    retry: 1,
    enabled: props?.enabled,
  })

  const result: IRentoraApiClientReportUtilityListResponse['data'] = useMemo(() => {
    return {
      data: rawData?.data ?? ([] as IRentoraApiClientReportUtilityListResponse['data']['data']),
      pagination: rawData?.pagination ?? DEFAULT_REPORT_UTILITY_LIST_DATA,
      metadata: rawData?.metadata ?? DEFAULT_REPORT_UTILITY_LIST_METADATA,
    }
  }, [rawData])

  return {
    ...rest,
    ...result,
  } as IUseRentoraApiReportUtilityList
}
