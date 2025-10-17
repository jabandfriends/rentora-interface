import type { IBaseUseMutation } from '@/types'

export type IUpdateUnitServiceRequestPayload = {
  waterUtilityId: string
  waterUtilityType: string
  waterUtilityUnitPrice: number
  waterUtilityFixedPrice: number

  electricUtilityId: string
  electricUtilityType: string
  electricUtilityUnitPrice: number
  electricUtilityFixedPrice: number
}

//hook
export type IUseUpdateUtilityService = IBaseUseMutation<void, IUpdateUnitServiceRequestPayload>
