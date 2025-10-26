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

//hook type
export type IUseRentoraApiCreateSupply = IBaseUseMutation<void, ISupplyCreatePayload>
