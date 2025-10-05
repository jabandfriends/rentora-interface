import type { IPaginate } from '@/types'

const DEFAULT_PAGINATION_DATA: IPaginate = {
  page: 1,
  size: 10,
  totalPages: 0,
  totalElements: 0,
}

export const DEFAULT_APARTMENT_LIST_DATA: IPaginate = DEFAULT_PAGINATION_DATA
export const DEFAULT_TENANT_LIST_DATA: IPaginate = DEFAULT_PAGINATION_DATA
export const DEFAULT_MAINTENANCE_LIST_DATA: IPaginate = DEFAULT_PAGINATION_DATA
