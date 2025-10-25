import type { SupplyCategory } from '@/enum'

export type ISupplyCreatePayload = {
  name: string
  category: SupplyCategory
  description?: string
  unit: string
  stockQuantity: number
  minStock: number
  costPerUnit: number
}
