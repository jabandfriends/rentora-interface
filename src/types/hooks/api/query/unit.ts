import type { IBasePaginateQueryResult, IRentoraApiClientBasePaginateWithMetadataResponse } from '@/types'

//hook
export type IUseRentoraApiUnitList = IBasePaginateQueryResult<IRentoraApiClientUnitListResponse['data']>
export type IRentoraApiClientUnitListResponse = IRentoraApiClientBasePaginateWithMetadataResponse<
  IUnit,
  IUnitListMetadata
>

export type IUnitListMetadata = {
  totalUnits: number
  totalUnitsAvailable: number
  totalUnitsMaintenance: number
  totalUnitsOccupied: number
}
export type IUnit = {
  id: string
  unitName: string
  unitType: string
  bedrooms: number
  bathrooms: number
  squareMeters: number
  unitStatus: string
  furnishingStatus: string
  floorName: string
  buildingName: string
  apartmentName: string
  currentTenant: string
  createdAt: string
  contractNumber: string
  rentalType: string
  contractStatus: string
  contractStartDate: string
  contractEndDate: string
}

export type IRentoraApiUnitListParams = {
  page?: number
  size?: number
  search?: string
  sortBy?: string
  sortDir?: string
  status?: string
  buildingName?: string
}
