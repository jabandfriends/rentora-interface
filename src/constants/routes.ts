import type { IRoute, IRoutes, Maybe } from '@/types'

const apartmentRoute = (subPath: string): IRoute => ({
  path: `/dashboard/:apartmentId${subPath}`,
  getPath: (apartmentId: Maybe<string>, id?: string) => {
    let path = `/dashboard/${apartmentId}${subPath}`
    if (id) path = path.replace(':id', id)
    return path
  },
})

export const ROUTES: IRoutes = {
  //static
  home: { path: '/' },
  allApartment: { path: '/apartment' },
  firstTimePasswordReset: { path: '/first-time-password-reset' },
  apartmentCreate: { path: '/setup/apartment-create' },
  apartmentSetup: { path: '/setup/apartment-setup' },

  //dashbord
  normalInvoice: apartmentRoute('/normal-invoice'),
  monthlyInvoice: apartmentRoute('/monthly-invoice'),
  maintenance: apartmentRoute('/maintenance'),
  maintenanceCreate: apartmentRoute('/maintenance/create'),
  maintenanceUpdate: apartmentRoute('/maintenance/update/:id'),
  maintenanceDetail: apartmentRoute('/maintenance/detail/:id'),
  overdueInvoice: apartmentRoute('/overdue-invoice'),
  overview: apartmentRoute('/overview'),
  allRoom: apartmentRoute('/all-room'),
  roomReport: apartmentRoute('/report/room'),
  receiptReport: apartmentRoute('/report/receipt'),
  electricWaterReport: apartmentRoute('/report/electric-water'),
  serviceInvoice: apartmentRoute('/service-invoice'),
  monthlyInvoiceCreate: apartmentRoute('/monthly-invoice/create'),
  monthlyInvoiceDetail: apartmentRoute('/monthly-invoice/detail/:id'),
  tenantCreate: apartmentRoute('/tenant/create'),
}
