import type { CONTRACT_RENTAL_TYPE, MonthlyInvoicePaymentStatus, UtilityPriceType } from '@/enum'
import type { IBaseUseQuery, IRentoraApiClientBaseResponse } from '@/types'

export type IMonthlyInvoice = {
  invoiceNumber: string
  invoiceId: string
  unitName: string
  buildingName: string
  tenantName: string
  tenantPhone: string
  totalAmount: number
  payment: MonthlyInvoicePaymentStatus
  rentAmount: number
  waterAmount: number
  electricAmount: number
}

export type IMonthlyInvoiceDetail = IMonthlyInvoice & {
  tenantEmail: string
  contractRentAmount: number
  floorName: string
  contractNumber: string
  dueDate: string
  billStart: string
  billEnd: string
  rentalType: CONTRACT_RENTAL_TYPE
  waterMeterStart: number
  waterMeterEnd: number
  totalWaterUsageUnit: number
  waterPricePerUnit: number
  waterFixedPrice: number
  waterPriceRateType: UtilityPriceType
  waterTotalCost: number
  electricMeterStart: number
  electricMeterEnd: number
  totalElectricUsageUnit: number
  electricPricePerUnit: number
  electricFixedPrice: number
  electricPriceRateType: UtilityPriceType
  electricTotalCost: number
  createdAt: string
}

//response
export type IRentoraApiClientMonthlyInvoiceDetailResponse = IRentoraApiClientBaseResponse<IMonthlyInvoiceDetail>

//hook
export type IUseMonthlyInvoiceDetail = IBaseUseQuery<IRentoraApiClientMonthlyInvoiceDetailResponse['data']>
