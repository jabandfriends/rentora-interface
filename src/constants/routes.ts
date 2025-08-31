import type { IRoutes } from '@/types'

export const ROUTES: IRoutes = {
  home: { path: '/' },
  apartmentCreate: { path: '/setup/apartment-create' },
  normalInvoice: { path: '/dashboard/normal-invoice' },
  monthlyInvoice: { path: '/dashboard/monthly-invoice' },
  overdueInvoice: { path: '/dashboard/overdue-invoice' },
  overview: { path: '/dashboard/overview' },
  allRoom: { path: '/dashboard/all-room' },
  roomReport: { path: '/dashboard/report/room' },
  receiptReport: { path: '/dashboard/report/receipt' },
}
