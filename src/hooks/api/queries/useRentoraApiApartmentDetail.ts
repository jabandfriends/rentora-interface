import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraApiApartmentDetailParams,
  IRentoraApiClientApartmentDetailResponse,
  IUseRentoraApiApartmentDetail,
} from '@/types'

export const useRentoraApiApartmentDetail = (
  props: IRentoraApiApartmentDetailParams,
): IUseRentoraApiApartmentDetail => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  return useQuery<IRentoraApiClientApartmentDetailResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.apartmentDetail, props?.apartmentId],
    queryFn: async () => {
      return await rentoraApiQueryClient.apartmentDetail({ apartmentId: props?.apartmentId })
    },
  })
}
