import type {
  IBasePaginateQueryResult,
  IBaseUseQuery,
  IRentoraApiClientBasePaginateWithMetadataResponse,
  IRentoraApiClientBaseResponse,
} from '@/types'

export type IReportUtilityListParams = {
  apartmentId: string
}

export type IReportUtility = {
  roomName: string
  buildingName: string
  tenantName: string
  electricUsage: number
  electricCost: number
  waterUsage: number
  waterCost: number
  waterMeterStart: number
  waterMeterEnd: number
  waterUnitUtilityId: string
  electricMeterStart: number
  electricMeterEnd: number
  electricUnitUtilityId: string
}

//hook type
export type IUseRentoraApiReportUtilityList = IBasePaginateQueryResult<
  IRentoraApiClientReportUtilityListResponse['data']
>

//reponse
export type IRentoraApiClientReportUtilityListResponse = IRentoraApiClientBasePaginateWithMetadataResponse<
  IReportUtility,
  IReportUtilityListMetadata
>

//metadata
export type IReportUtilityListMetadata = {
  electricUsageUnits: number
  waterUsageUnits: number
  totalUsageUnits: number
  electricUsagePrices: number
  waterUsagePrices: number
  totalAmount: number
}

//params
export type IRentoraApiReportUtilityListParams = {
  page?: number
  size?: number
  unitName?: string
  sortBy?: string
  sortDir?: string
  readingDate?: string
  buildingName?: string
}

export type IReadingUnitUtility = {
  readingDate: string
}
export type IReadingRoomReport = {
  readingDate: string
}

export type IRentoraApiClientReadingUnitUtilityResponse = IRentoraApiClientBaseResponse<Array<IReadingUnitUtility>>

//hook
export type IUseRentoraApiReadingUnitUtility = IBaseUseQuery<IRentoraApiClientReadingUnitUtilityResponse['data']>
