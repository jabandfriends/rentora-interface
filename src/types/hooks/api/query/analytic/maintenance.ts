import type { MAINTENANCE_CATEGORY } from '@/enum'
import type { IBaseUseQuery, IRentoraApiClientBaseResponse } from '@/types'

export type IMaintenanceCategorySummary = {
  category: MAINTENANCE_CATEGORY
  count: number
}

export type IMaintenanceYearlyStatistics = {
  year: number
  totalRequests: number
  totalCost: number
  completed: number
  pending: number
  avgCost: number
  completionRate: number
}

type IMaintenanceBaseSummaryTrend = {
  count: number
  totalCost: number
}

export type IMaintenanceYearlySummaryTrend = {
  year: number
  summary: IMaintenanceBaseSummaryTrend
} & { period: number }

export type IMaintenanceMonthlySummaryTrend = {
  month: number
  summary: IMaintenanceBaseSummaryTrend
} & { period: string }

//param
export type IMaintenanceMonthlySummaryTrendParam = {
  year: number
}
//response
export type IRentoraApiClientMaintenanceAvailableYearsResponse = IRentoraApiClientBaseResponse<Array<number>>
export type IRentoraApiClientMaintenanceCategorySummaryResponse = IRentoraApiClientBaseResponse<
  Array<IMaintenanceCategorySummary>
>
export type IRentoraApiClientMaintenanceYearlyStatisticsResponse = IRentoraApiClientBaseResponse<
  Array<IMaintenanceYearlyStatistics>
>
export type IRentoraApiClientMaintenanceYearlySummaryTrendResponse = IRentoraApiClientBaseResponse<
  Array<IMaintenanceYearlySummaryTrend>
>
export type IRentoraApiClientMaintenanceMonthlySummaryTrendResponse = IRentoraApiClientBaseResponse<
  Array<IMaintenanceMonthlySummaryTrend>
>
//hook
export type IUseRentoraApiMaintenanceAvailableYears = IBaseUseQuery<
  IRentoraApiClientMaintenanceAvailableYearsResponse['data']
>
export type IUseRentoraApiMaintenanceCategorySummary = IBaseUseQuery<
  IRentoraApiClientMaintenanceCategorySummaryResponse['data']
>
export type IUseRentoraApiMaintenanceYearlyStatistics = IBaseUseQuery<
  IRentoraApiClientMaintenanceYearlyStatisticsResponse['data']
>

export type IUseRentoraApiMaintenanceYearlySummaryTrend = IBaseUseQuery<
  IRentoraApiClientMaintenanceYearlySummaryTrendResponse['data']
>
export type IUseRentoraApiMaintenanceMonthlySummaryTrend = IBaseUseQuery<
  IRentoraApiClientMaintenanceMonthlySummaryTrendResponse['data']
>
