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
  tenantName: string
  electricUsage: number
  electricCost: number
  waterUsage: number
  waterCost: number
}

export type IReportRoom = {
  id: string | null
  roomName: string
  tenantName: string | null
  reservedName: string | null
  totalAmount: number | null
  issueDate: string | null
  dueDate: string | null
  checkoutDate: string | null
  status: string
  currentContractId: string | null
  currentTenantId: string | null
  currentTenantName: string | null
  currentTenantEmail: string | null
  currentRentalPrice: number | null
}

export type IReportReceipt = {
  id: string
  adhocNumber: string
  apartmentId: string
  unitId: string
  tenantUserId: string | null
  title: string | null
  description: string | null
  category: string | null
  finalAmount: number | null
  paidAmount: number | null
  invoiceDate: string | null
  dueDate: string | null
  paymentStatus: string
  createdAt: string
  updatedAt: string
}

//hook type
export type IUseRentoraApiReportUtilityList = IBasePaginateQueryResult<
  IRentoraApiClientReportUtilityListResponse['data']
>
export type IUseRentoraApiReportRoomList = IBasePaginateQueryResult<IRentoraApiClientReportRoomListResponse['data']>

export type IUseRentoraApiReportReceiptList = IBasePaginateQueryResult<
  IRentoraApiClientReportReceiptListResponse['data']
>

//reponse
export type IRentoraApiClientReportUtilityListResponse = IRentoraApiClientBasePaginateWithMetadataResponse<
  IReportUtility,
  IReportUtilityListMetadata
>
export type IRentoraApiClientReportRoomListResponse = IRentoraApiClientBasePaginateWithMetadataResponse<
  IReportRoom,
  IReportRoomListMetadata
>

export type IRentoraApiClientReportReceiptListResponse = IRentoraApiClientBasePaginateWithMetadataResponse<
  IReportReceipt,
  IReportReceiptListMetadata
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
export type IReportRoomListMetadata = {
  totalRooms: number
  availableRooms: number
  unavailableRooms: number
}

export type IReportReceiptListMetadata = {
  totalBill: number
  receiptPaid: number
  receiptUnpaid: number
  receiptOverdue: number
}
//params
export type IRentoraApiReportUtilityListParams = {
  page?: number
  size?: number
  unitName?: string
  sortBy?: string
  sortDir?: string
  readingDate?: string
}
export type IRentoraApiReportRoomListParams = {
  page?: number
  size?: number
  sortBy?: string
  sortDir?: string
  search?: string
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
