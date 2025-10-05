import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { useMemo } from 'react'

import { RENTORA_API_BASE_URL } from '@/config'
import { DEFAULT_APARTMENT_LIST_DATA } from '@/constants' // ใช้เป็นค่า Default Pagination
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraApiClientMaintenanceDetailResponse,
  IRentoraApiMaintenanceDetailParams,
  IUseRentoraApiMaintenanceList,
} from '@/types'

export const useRentoraApiMaintenanceList = (props: {
  params: IRentoraApiMaintenanceListParams
}): IUseRentoraApiMaintenanceList => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  const { data: rawData, ...rest }: UseQueryResult<IRentoraApiClientMaintenanceDetailResponse['data']> = useQuery({
    queryKey: [
      rentoraApiQueryClient.key.maintenanceList,
      props?.params?.apartmentId,
      props?.params?.page,
      props?.params?.size,
      props?.params?.search,
      props?.params?.sortBy,
      props?.params?.sortDir,
      props?.params?.status,
    ],

    queryFn: async () => {
      const { apartmentId, page, size, search, sortBy, sortDir, status }: IRentoraApiMaintenanceDetailParams =
        props?.params ?? {}

      return await rentoraApiQueryClient.maintenanceList({
        ...(props?.params ?? {}),
        ...(search ? { search } : {}),
        ...(sortBy ? { sortBy } : {}),
        ...(sortDir ? { sortDir } : {}),
        ...(status ? { status } : {}),
        apartmentId,
        page,
        size,
      })
    },
    enabled: !!props?.params?.apartmentId,
    retry: 1,
  })

  const result: IRentoraApiClientMaintenanceDetailResponse = useMemo(() => {
    const data = rawData?.data

    return {
      maintenances: data?.maintenances ?? [],
      totalMaintenance: data?.totalMaintenance ?? 0,
      pendingCount: data?.pendingCount ?? 0,
      assignedCount: data?.assignedCount ?? 0,
      inProgressCount: data?.inProgressCount ?? 0,
      currentPage: data?.currentPage ?? DEFAULT_APARTMENT_LIST_DATA.page,
      totalPages: data?.totalPages ?? DEFAULT_APARTMENT_LIST_DATA.totalPages,
    }
  }, [rawData])

  return {
    ...rest,
    ...result,
  } as IUseRentoraApiMaintenanceList
}
