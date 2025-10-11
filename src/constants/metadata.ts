import type {
  IApartmentListMetadata,
  IInvoiceListMetadata,
  IMaintenanceListMetadata,
  IOverdueInvoiceListMetadata,
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

export const DEFAULT_MAINTENANCE_LIST_METADATA: IMaintenanceListMetadata = {
  totalMaintenance: 0,
  pendingCount: 0,
  inProgressCount: 0,
  completedCount: 0,
}

export const DEFAULT_INVOICE_LIST_METADATA: IInvoiceListMetadata = {
  totalInvoice: 0,
  paidInvoice: 0,
  unpaidInvoice: 0,
  partiallyPaidInvoice: 0,
  overdueInvoice: 0,
  cancelledInvoice: 0,
}

export const DEFAULT_OVERDUE_INVOICE_LIST_METADATA: IOverdueInvoiceListMetadata = {
  overdueInvoice: 0,
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
