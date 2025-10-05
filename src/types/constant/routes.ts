import type { Maybe } from '@/types'

export type IRoute = {
  path: string
  getPath: (apartmentId: Maybe<string>, id?: string) => string
}

export type IRouteWithUrl = IRoute & {
  getUrl: (apartmentId: Maybe<string>) => string
}

export type IRoutes = {
  auth: Omit<IRoute, 'getPath'>
  firstTimePasswordReset: Omit<IRoute, 'getPath'>
  apartmentCreate: Omit<IRoute, 'getPath'>
  apartmentSetup: Omit<IRouteWithUrl, 'getPath'>
  allApartment: Omit<IRoute, 'getPath'>
  // maintenanceCreate: Omit<IRouteWithUrl, 'getPath'>

  // dashboard "/dashboard/:apartmentId/${subpath}"
  normalInvoice: IRoute
  monthlyInvoice: IRoute
  maintenance: IRoute
  overdueInvoice: IRoute
  overview: IRoute
  allRoom: IRoute
  roomReport: IRoute
  receiptReport: IRoute
  electricWaterReport: IRoute
  serviceInvoice: IRoute
  maintenanceCreate: IRoute
  maintenanceDetail: IRoute
  monthlyInvoiceCreate: IRoute
  maintenanceUpdate: IRoute
  monthlyInvoiceDetail: IRoute
  invoiceCreate: IRoute
  tenantCreate: IRoute
  tenant: IRoute
  tenantUpdatePassword: IRoute
  invoiceDetail: IRoute
  tenantUpdate: IRoute
}
