import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { useMemo } from 'react'

import { RENTORA_API_BASE_URL } from '@/config'
import { DEFAULT_REPORT_ROOM_LIST_DATA, DEFAULT_REPORT_ROOM_LIST_METADATA } from '@/constants'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraApiClientReportRoomListResponse,
  IRentoraApiReportRoomListParams,
  IUseRentoraApiReportRoomList,
  Maybe,
} from '@/types'

export const useRentoraApiReportRoom = (props: {
  enabled?: boolean
  apartmentId: Maybe<string>
  params: IRentoraApiReportRoomListParams
}): IUseRentoraApiReportRoomList => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  const { data: rawData, ...rest }: UseQueryResult<IRentoraApiClientReportRoomListResponse['data']> = useQuery({
    queryKey: [
      rentoraApiQueryClient.key.reportRoomList,
      props?.apartmentId,
      props?.params.page,
      props?.params.size,
      props?.params.sortBy,
      props?.params.sortDir,
      props?.params.search,
    ],
    queryFn: async () => {
      const { page, size, sortBy, sortDir, search }: IRentoraApiReportRoomListParams = props?.params ?? {}
      return await rentoraApiQueryClient.reportRoomList(props?.apartmentId, {
        ...(props?.params ?? {}),
        ...(page ? { page } : {}),
        ...(size ? { size } : {}),
        ...(sortBy ? { sortBy } : {}),
        ...(sortDir ? { sortDir } : {}),
        ...(search ? { search } : {}),
      })
    },
    retry: 1,
    enabled: props?.enabled,
  })

  const result: IRentoraApiClientReportRoomListResponse['data'] = useMemo(() => {
    return {
      data: rawData?.data ?? ([] as IRentoraApiClientReportRoomListResponse['data']['data']),
      pagination: rawData?.pagination ?? DEFAULT_REPORT_ROOM_LIST_DATA,
      metadata: rawData?.metadata ?? DEFAULT_REPORT_ROOM_LIST_METADATA,
    }
  }, [rawData])

  return {
    ...rest,
    ...result,
  } as IUseRentoraApiReportRoomList
}
