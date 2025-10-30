import type { SupplyCategory, SupplyStockStatus } from '@/enum'
import type { IBasePaginateQueryResult, IRentoraApiClientBasePaginateWithMetadataResponse, Maybe } from '@/types'

export type ISupply = {
  supplyId: string
  supplyName: string
  supplyQuantity: number
  supplyMinStock: number
  supplyUnitPrice: number
  supplyUnit: string
  supplyCategory: SupplyCategory
  supplyStockStatus: SupplyStockStatus
  supplyTotalCost: number
  supplyDescription: string
}

//metadata
export type ISupplyListMetadata = {
  totalSupplies: number
  totalLowStockSupplies: number
  totalCostSupplies: number
}

//params
export type IRentoraApiSupplyListParams = {
  page: number
  size: number
  search?: string //supply name
  category?: Maybe<SupplyCategory>
  sortBy?: string
  sortDir?: 'asc' | 'desc'
}

//response
export type IRentoraApiClientSupplyListResponse = IRentoraApiClientBasePaginateWithMetadataResponse<
  ISupply,
  ISupplyListMetadata
>

//hook
export type IUseRentoraApiSupplyList = IBasePaginateQueryResult<IRentoraApiClientSupplyListResponse['data']>
