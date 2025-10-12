import type {
  IApartmentListMetadata,
  IReportReceiptListMetadata,
  IReportRoomListMetadata,
  IReportUtilityListMetadata,
  ITenantListMetadata,
  IUnitListMetadata,
} from '@/types'

//apartment list
export const DEFAULT_APARTMENT_LIST_METADATA: IApartmentListMetadata = {
  totalApartments: 0,
  totalActiveApartments: 0,
}

export const DEFAULT_TENANT_LIST_METADATA: ITenantListMetadata = {
  totalTenants: 0,
  totalOccupiedTenants: 0,
  totalUnoccupiedTenants: 0,
  totalActiveTenants: 0,
}

export const DEFAULT_UNIT_LIST_METADATA: IUnitListMetadata = {
  totalUnits: 0,
  totalUnitsAvailable: 0,
  totalUnitsMaintenance: 0,
  totalUnitsOccupied: 0,
}

export const DEFAULT_REPORT_UTILITY_LIST_METADATA: IReportUtilityListMetadata = {
  electricUsageUnits: 0,
  waterUsageUnits: 0,
  totalUsageUnits: 0,
  electricUsagePrices: 0,
  waterUsagePrices: 0,
  totalAmount: 0,
}
export const DEFAULT_REPORT_ROOM_LIST_METADATA: IReportRoomListMetadata = {
  totalRooms: 0,
  availableRooms: 0,
  unavailableRooms: 0,
}

export const DEFAULT_REPORT_RECEIPT_LIST_METADATA: IReportReceiptListMetadata = {
  totalBill: 0,
  receiptPaid: 0,
  receiptUnpaid: 0,
  receiptOverdue: 0,
}
