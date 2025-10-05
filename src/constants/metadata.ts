import type { IApartmentListMetadata, IMaintenanceListMetadata, ITenantListMetadata } from '@/types'

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
  assignedCount: 0,
  inProgressCount: 0,
}
