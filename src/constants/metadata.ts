import type {
  IApartmentListMetadata,
  IInvoiceListMetadata,
  IMaintenanceListMetadata,
  IMonthlyInvoiceMetaData,
  IMonthlyUtilityBuildingMetadata,
  IOverdueInvoiceListMetadata,
  IPaymentListMetadata,
  IReportUtilityListMetadata,
  ISupplyListMetadata,
  ITenantListMetadata,
  IUnitListMetadata,
} from '@/types'

//apartment list
export const DEFAULT_APARTMENT_LIST_METADATA: IApartmentListMetadata = {
  totalApartments: 0,
  totalActiveApartments: 0,
}

//supply list
export const DEFAULT_SUPPLY_LIST_METADATA: ISupplyListMetadata = {
  totalSupplies: 0,
  totalLowStockSupplies: 0,
  totalCostSupplies: 0,
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
  urgentCount: 0,
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

export const DEFAULT_MONTHLY_INVOICE_METADATA: IMonthlyInvoiceMetaData = {
  totalMonthlyInvoices: 0,
  totalUnpaidMonthlyInvoices: 0,
  totalPaidMonthlyInvoices: 0,
  totalOverdueMonthlyInvoice: 0,
}
export const DEFAULT_PAYMENT_LIST_METADATA: IPaymentListMetadata = {
  totalPayments: 0,
  totalPaymentsComplete: 0,
  totalPaymentsPending: 0,
  totalPaymentsFailed: 0,
}

export const DEFAULT_MONTHLY_UTILITY_BUILDING_METADATA: IMonthlyUtilityBuildingMetadata = {
  totalUtilityBuildings: 0,
}
