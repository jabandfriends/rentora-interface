import type { PaymentStatus } from '@/enum'
import type { IBaseUseQuery, IRentoraApiClientBaseResponse } from '@/types'

type IPaymentBaseSummary = {
  count: number
  totalCost: number
}
export type IPaymentMonthlySummary = {
  period: string
} & IPaymentBaseSummary

export type IPaymentStatsSummary = {
  totalRental: number
  totalPaid: number
  totalPending: number
  totalOverdue: number
}

export type IPaymentYearlySummary = {
  period: number
} & IPaymentBaseSummary

export type IPaymentMonthlySummaryParam = {
  year: number
}

export type IPaymentDistributionSummary = {
  paymentStatus: PaymentStatus
  totalPayment: number
}
//response
export type IRentoraApiClientPaymentAvailableYearResponse = IRentoraApiClientBaseResponse<Array<number>>
export type IRentoraApiClientPaymentMonthlySummaryResponse = IRentoraApiClientBaseResponse<
  Array<IPaymentMonthlySummary>
>
export type IRentoraApiClientPaymentYearlySummaryResponse = IRentoraApiClientBaseResponse<Array<IPaymentYearlySummary>>
export type IRentoraApiClientPaymentStatsSummaryResponse = IRentoraApiClientBaseResponse<IPaymentStatsSummary>
export type IRentoraApiClientPaymentDistributionSummaryResponse = IRentoraApiClientBaseResponse<
  Array<IPaymentDistributionSummary>
>

//hook
export type IUseRentoraApiPaymentAvailableYear = IBaseUseQuery<IRentoraApiClientPaymentAvailableYearResponse['data']>
export type IUseRentoraApiPaymentMonthlySummary = IBaseUseQuery<IRentoraApiClientPaymentMonthlySummaryResponse['data']>
export type IUseRentoraApiPaymentYearlySummary = IBaseUseQuery<IRentoraApiClientPaymentYearlySummaryResponse['data']>
export type IUseRentoraApiPaymentStatsSummary = IBaseUseQuery<IRentoraApiClientPaymentStatsSummaryResponse['data']>
export type IUseRentoraApiPaymentDistributionSummary = IBaseUseQuery<
  IRentoraApiClientPaymentDistributionSummaryResponse['data']
>
