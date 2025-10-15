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
  auth: { path: '/authentication' },

  allApartment: { path: '/' },
  firstTimePasswordReset: { path: '/authentication/first-time-password-reset' },
  apartmentCreate: { path: '/create/apartment' },
  apartmentSetup: { path: '/setup/:apartmentId', getUrl: (apartmentId: Maybe<string>) => `/setup/${apartmentId}` },
  accountSettings: { path: '/account/setting' },
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
  tenant: apartmentRoute('/tenant'),
  invoiceCreate: apartmentRoute('/invoice/create'),
  tenantCreate: apartmentRoute('/tenant/create'),
  tenantUpdatePassword: apartmentRoute('/tenant/update-password/:id'),
  invoiceDetail: apartmentRoute('/invoice/detail/:id'),
  tenantUpdate: apartmentRoute('/tenant/update/:id'),
  roomDetail: apartmentRoute('/all-room/detail/:id'),
  contractCreate: apartmentRoute('/:id/contract/create'),
  meterReadingList: apartmentRoute('/meter-reading'),
  meterReadingCreate: apartmentRoute('/meter-reading/create'),
}
