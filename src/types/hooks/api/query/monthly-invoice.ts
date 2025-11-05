import type {
  ApartmentPaymentMethodType,
  CONTRACT_RENTAL_TYPE,
  MonthlyInvoicePaymentStatus,
  UtilityPriceType,
} from '@/enum'
import type {
  IBasePaginateQueryResult,
  IBaseUseQuery,
  IRentoraApiClientBasePaginateWithMetadataResponse,
  IRentoraApiClientBaseResponse,
} from '@/types'

export type IMonthlyInvoice = {
  invoiceNumber: string
  invoiceId: string
  unitName: string
  buildingName: string
  tenantName: string
  tenantPhone: string
  totalAmount: number
  paymentStatus: MonthlyInvoicePaymentStatus
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

  //payment
  apartmentPaymentMethodType: ApartmentPaymentMethodType
  bankName: string
  bankAccountNumber: string
  accountHolderName: string
  promptpayNumber: string

  serviceList: Array<IMonthlyInvoiceService>
  unitAdhocInvoices: Array<IMonthlyInvoiceUnitAdhocInvoice>
}

export type IMonthlyInvoiceUnitAdhocInvoice = {
  adhocId: string
  adhocNumber: string
  adhocTitle: string
  amount: number
}
export type IMonthlyInvoiceService = {
  serviceName: string
  servicePrice: number
}
//params
export type IRentoraApiMonthlyInvoiceListWithFullDetailsParams = {
  genMonth: string
}
//response
export type IRentoraApiClientMonthlyInvoiceDetailResponse = IRentoraApiClientBaseResponse<IMonthlyInvoiceDetail>
export type IRentoraApiClientMonthlyInvoiceListWithFullDetailsResponse = IRentoraApiClientBaseResponse<
  Array<IMonthlyInvoiceDetail>
>

//hook
export type IUseMonthlyInvoiceDetail = IBaseUseQuery<IRentoraApiClientMonthlyInvoiceDetailResponse['data']>
export type IUseMonthlyInvoiceListWithFullDetails = IBaseUseQuery<
  IRentoraApiClientMonthlyInvoiceListWithFullDetailsResponse['data']
>

//monthly invoice-------

export type IRentoraApiMonthlyInvoiceListParams = {
  page?: number
  size?: number
  sortBy?: string
  sortDir?: string
  unitName?: string
  buildingName?: string
  paymentStatus?: MonthlyInvoicePaymentStatus
  genMonth: string
}
//meta data
export type IMonthlyInvoiceMetaData = {
  totalMonthlyInvoices: number
  totalUnpaidMonthlyInvoices: number
  totalPaidMonthlyInvoices: number
  totalOverdueMonthlyInvoice: number
}

//response
export type IRentoraApiClientMonthlyInvoiceListResponse = IRentoraApiClientBasePaginateWithMetadataResponse<
  IMonthlyInvoice,
  IMonthlyInvoiceMetaData
>

//hook
export type IUseMonthlyInvoiceList = IBasePaginateQueryResult<IRentoraApiClientMonthlyInvoiceListResponse['data']>
