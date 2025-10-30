import type { UnitStatus } from '@/enum'
import type {
  IBasePaginateQueryResult,
  IBaseUseQuery,
  IRentoraApiClientBasePaginateResponse,
  IRentoraApiClientBasePaginateWithMetadataResponse,
  IRentoraApiClientBaseResponse,
} from '@/types'

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
  unitStatus: UnitStatus
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
  balconyCount: number
  parkingSpaces: number
}

export type IRentoraApiUnitListParams = {
  page?: number
  size?: number
  search?: string
  sortBy?: string
  sortDir?: string
  status?: UnitStatus
  buildingName?: string
  floorId?: string
}

// room type
export type IUnitWithMonthlyInvoiceStatus = {
  unitId: string
  unitName: string
  unitStatus: string
  buildingName: string
  isMonthlyInvoiceCreated: boolean
}

//param
export type IRentoraApiAllUnitMonthlyInvoiceStatusParams = {
  status?: string //unit status
  roomNumber?: string
  buildingName?: string
  readingDate?: string
  isExceptDailyContract?: boolean
}
//response
export type IRentoraApiClientAllUnitMonthlyInvoiceStatusResponse =
  IRentoraApiClientBasePaginateResponse<IUnitWithMonthlyInvoiceStatus>
//hook
export type IUseRentoraApiAllUnitMonthlyInvoiceStatus = IBasePaginateQueryResult<
  IRentoraApiClientAllUnitMonthlyInvoiceStatusResponse['data']
>

//response unit detail
export type IRentoraApiClientUnitDetailResponse = IRentoraApiClientBaseResponse<IUnit>
//hook
export type IUseRentoraApiUnitDetail = IBaseUseQuery<IRentoraApiClientUnitDetailResponse['data']>
