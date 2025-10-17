import type { IBaseUseQuery, IRentoraApiClientBaseResponse } from '@/types'

export type IUtility = {
  utilityId: string
  utilityType: string
  utilityName: string
  utilityFixedPrice: number
  utilityUnitPrice: number
}

export type IRentoraApiClientUtilityListResponse = IRentoraApiClientBaseResponse<Array<IUtility>>

export type IUseRentoraApiClientUtilityListResponse = IBaseUseQuery<IRentoraApiClientUtilityListResponse['data']>
