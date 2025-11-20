import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { RENTORA_API_BASE_URL } from '@/config'
import { DEFAULT_PAYMENT_LIST_DATA } from '@/constants'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraApiClientTenantPaymentResponse,
  ITenantApartmentParams,
  IUseRentoraApiTenantPayments,
} from '@/types'

export const useRentoraApiTenantPayments = (props: {
  apartmentId: string
  params: ITenantApartmentParams
}): IUseRentoraApiTenantPayments => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  const { data: rawData, ...rest } = useQuery<IRentoraApiClientTenantPaymentResponse['data'], Error>({
    queryKey: [
      rentoraApiQueryClient.key.tenantPayment,
      props.apartmentId,
      props.params.page,
      props.params.size,
      props.params.paymentStatus,
      props.params.verificationStatus,
    ],
    queryFn: async () => {
      const { page, size, paymentStatus, verificationStatus }: ITenantApartmentParams = props?.params ?? {}
      return await rentoraApiQueryClient.tenantPayment(props.apartmentId, {
        page,
        size,
        ...(paymentStatus ? { paymentStatus } : {}),
        ...(verificationStatus ? { verificationStatus } : {}),
      })
    },
    enabled: !!props.apartmentId,
  })

  const result: IRentoraApiClientTenantPaymentResponse['data'] = useMemo(() => {
    return {
      data: rawData?.data ?? ([] as IRentoraApiClientTenantPaymentResponse['data']['data']),
      pagination: rawData?.pagination ?? DEFAULT_PAYMENT_LIST_DATA,
    }
  }, [rawData])

  return {
    ...rest,
    ...result,
  } as IUseRentoraApiTenantPayments
}
