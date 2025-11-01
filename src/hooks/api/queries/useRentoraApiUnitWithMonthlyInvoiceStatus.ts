import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { RENTORA_API_BASE_URL } from '@/config'
import { DEFAULT_UNIT_LIST_DATA } from '@/constants'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraApiAllUnitMonthlyInvoiceStatusParams,
  IRentoraApiClientAllUnitMonthlyInvoiceStatusResponse,
  IUseRentoraApiAllUnitMonthlyInvoiceStatus,
  Maybe,
} from '@/types'

export const useRentoraApiUnitWithMonthlyInvoiceStatus = (props: {
  apartmentId: Maybe<string>
  params: IRentoraApiAllUnitMonthlyInvoiceStatusParams
  enabled?: boolean
}): IUseRentoraApiAllUnitMonthlyInvoiceStatus => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  const { data: rawData, ...rest } = useQuery<IRentoraApiClientAllUnitMonthlyInvoiceStatusResponse['data']>({
    queryKey: [
      props.apartmentId,
      rentoraApiQueryClient.key.allUnitMonthlyInvoiceStatus,
      props.params.buildingName,
      props.params.roomNumber,
      props.params.readingDate,
      props.params.isExceptDailyContract,
    ],
    queryFn: () => rentoraApiQueryClient.allUnitMonthlyInvoiceStatus(props.apartmentId, props.params),
    enabled: props.enabled ?? true,
  })

  const result: IRentoraApiClientAllUnitMonthlyInvoiceStatusResponse['data'] = useMemo(() => {
    return {
      data: rawData?.data ?? ([] as IRentoraApiClientAllUnitMonthlyInvoiceStatusResponse['data']['data']),
      pagination: rawData?.pagination ?? DEFAULT_UNIT_LIST_DATA,
    }
  }, [rawData])

  return {
    ...rest,
    ...result,
  } as IUseRentoraApiAllUnitMonthlyInvoiceStatus
}
