import type { IApartmentListMetadata, ITenantListMetadata } from '@/types'

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
