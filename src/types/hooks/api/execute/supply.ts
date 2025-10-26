import type { SupplyCategory } from '@/enum'
import type { IBaseUseMutation } from '@/types'

export type ISupplyCreatePayload = {
  name: string
  category: SupplyCategory
  description?: string
  unit: string
  stockQuantity: number
  minStock: number
  costPerUnit: number
}

export type ISupplyUpdatePayload = ISupplyCreatePayload & {
  supplyId: string
}

export type ISupplyDeletePayload = {
  supplyId: string
}

//hook type
export type IUseRentoraApiCreateSupply = IBaseUseMutation<void, ISupplyCreatePayload>
export type IUseRentoraApiUpdateSupply = IBaseUseMutation<void, ISupplyUpdatePayload>
export type IUseRentoraApiDeleteSupply = IBaseUseMutation<void, ISupplyDeletePayload>
