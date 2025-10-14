import { useQuery } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiQueryClient } from '@/hooks'
import type { IRentoraApiClientReadingUnitUtilityResponse, IUseRentoraApiReadingUnitUtility, Maybe } from '@/types'

export const useRentoraApiReportReadingDateUtility = (props: {
  apartmentId: Maybe<string>
}): IUseRentoraApiReadingUnitUtility => {
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  return useQuery<IRentoraApiClientReadingUnitUtilityResponse['data']>({
    queryKey: [rentoraApiQueryClient.key.reportReadingDateUtility, props.apartmentId],
    queryFn: () => {
      return rentoraApiQueryClient.readingUnitUtility(props.apartmentId)
    },
    retry: 1,
    enabled: !!props.apartmentId,
  })
}
