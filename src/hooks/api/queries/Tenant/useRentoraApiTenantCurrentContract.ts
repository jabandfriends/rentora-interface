import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import type { IRentoraApiClientTenantCurrentContractResponse, IUseRentoraApiTenantCurrentContract } from '@/types'

export const useRentoraApiTenantCurrentContract = (props: {
  apartmentId: string
}): IUseRentoraApiTenantCurrentContract => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  return useQuery<IRentoraApiClientTenantCurrentContractResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.tenantCurrentContract, props.apartmentId],
    queryFn: () => rentoraApiQueryClient.tenantCurrentContract(props.apartmentId),
    retry: 1,
    enabled: !!props.apartmentId,
  })
}
