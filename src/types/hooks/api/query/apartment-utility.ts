import type { IBaseUseQuery, IRentoraApiClientBaseResponse } from '../base-api'

//data
export type IApartmentUtility = {
  apartmentId: string
  totalUsage: IApartmentUtilityTotalUsage
  monthlyBreakdown: IApartmentUtilityMonthly
}

export type IApartmentUtilityTotalUsage = {
  electric: number
  water: number
}

export type IApartmentUtilityMonthly = {
  electric: Array<IApartmentUtilityMonthlyDetail>
  water: Array<IApartmentUtilityMonthlyDetail>
}

export type IApartmentUtilityMonthlyDetail = {
  month: string
  usageAmount: number
}

//params
export type IApartmentUtilityParams = {
  year: number
}

export type IRentoraApiClietApartmentUtilityResponse = IRentoraApiClientBaseResponse<IApartmentUtility>
export type IUseRentoraApiApartmentUtility = IBaseUseQuery<IRentoraApiClietApartmentUtilityResponse['data']>

//data for Yearly Utility
export type IYearlyApartmentUtility = {
  year: number
  usageTotals: IApartmentUtilityTotalUsage
}

export type IRentoraApiClietYearlyApartmentResponse = IRentoraApiClientBaseResponse<Array<IYearlyApartmentUtility>>
export type IUseRentoraApiYearlyApartment = IBaseUseQuery<IRentoraApiClietYearlyApartmentResponse['data']>
