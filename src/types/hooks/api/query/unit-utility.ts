import type { IBaseUseQuery, IRentoraApiClientBaseResponse, Maybe } from '@/types'

export type IUnitUtilityAvailableYearResponse = {
  years: Array<number>
}

export type IUnitUtilityAvailableMonthResponse = {
  year: number
  months: Array<number>
}

export type IUnitWithUtilityResponse = {
  unitId: string
  unitName: string
  unitStatus: string
  buildingName: string
  waterMeterStart: number
  electricMeterStart: number
}

//param
export type IRentoraApiUnitUtilityAvailableMonthParams = {
  year?: Maybe<number>
  buildingName?: string
}
export type IRentoraApiUnitWithUtilityParams = {
  buildingName?: string
}

//hook
export type IUseRentoraApiUnitUtilityAvailableYear = IBaseUseQuery<
  IRentoraApiClientUnitUtilityAvailableYearResponse['data']
>
export type IUseRentoraApiUnitUtilityAvailableMonth = IBaseUseQuery<
  IRentoraApiClientUnitUtilityAvailableMonthResponse['data']
>
export type IUseRentoraApiUnitWithUtility = IBaseUseQuery<IRentoraApiClientUnitWithUtilityResponse['data']>

//response
export type IRentoraApiClientUnitUtilityAvailableYearResponse =
  IRentoraApiClientBaseResponse<IUnitUtilityAvailableYearResponse>

export type IRentoraApiClientUnitUtilityAvailableMonthResponse =
  IRentoraApiClientBaseResponse<IUnitUtilityAvailableMonthResponse>

export type IRentoraApiClientUnitWithUtilityResponse = IRentoraApiClientBaseResponse<Array<IUnitWithUtilityResponse>>
