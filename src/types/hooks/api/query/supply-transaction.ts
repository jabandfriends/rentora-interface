import type { SupplyTransactionNumberType, SupplyTransactionType } from '@/enum'
import type { IBasePaginateQueryResult, IRentoraApiClientBasePaginateResponse } from '@/types'

//response
export type IRentoraApiClientSupplyTransactionListResponse = IRentoraApiClientBasePaginateResponse<ISupplyTransaction>

//params
export type IRentoraApiSupplyTransactionListParams = {
  page: number
  size: number
  supplyName?: string
  transactionType?: SupplyTransactionType
  sortBy?: string
  sortDir?: 'asc' | 'desc'
}

export type ISupplyTransaction = {
  transactionDate: string
  supplyName: string
  supplyTransactionType: SupplyTransactionType
  quantity: number
  note: string
  changeByUser: string
  maintenanceId: string
  maintenanceNumber: string
  numberType: SupplyTransactionNumberType
}

//hook
export type IUseRentoraApiSupplyTransactionList = IBasePaginateQueryResult<
  IRentoraApiClientSupplyTransactionListResponse['data']
>
