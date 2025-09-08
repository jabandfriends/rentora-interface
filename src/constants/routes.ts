import type { IRoutes } from '@/types'

export const ROUTES: IRoutes = {
  home: { path: '/' },
  firstTimePasswordReset: { path: '/first-time-password-reset' },
  apartmentCreate: { path: '/setup/apartment-create' },
  apartmentSetup: { path: '/setup/apartment-setup' },
  normalInvoice: { path: '/dashboard/normal-invoice' },
  monthlyInvoice: { path: '/dashboard/monthly-invoice' },
  maintenance: { path: '/dashboard/maintenance' },
  maintenanceCreate: { path: '/dashboard/maintenance/create' },
  maintenanceDetail: {
    path: '/dashboard/maintenance/detail/:id',
    getURL: (id: string) => `/dashboard/maintenance/detail/${id}`,
  },
  overdueInvoice: { path: '/dashboard/overdue-invoice' },
  overview: { path: '/dashboard/overview' },
  allRoom: { path: '/dashboard/all-room' },
  roomReport: { path: '/dashboard/report/room' },
  receiptReport: { path: '/dashboard/report/receipt' },
  electricWaterReport: { path: '/dashboard/report/electric-water' },
  serviceInvoice: { path: '/dashboard/service-invoice' },
  monthlyInvoiceCreate: { path: '/dashboard/monthly-invoice/create' },
  monthlyInvoiceDetail: {
    path: '/dashboard/monthly-invoice/detail/:id',
    getURL: (id: string) => `/dashboard/monthly-invoice/detail/${id}`,
  },
  allApartment: { path: '/apartment' },
}
