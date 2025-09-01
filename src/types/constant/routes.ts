type IRoute = {
  path: string
  getURL: (slug: string) => string
}

export type IRoutes = {
  home: Omit<IRoute, 'getURL'>
  apartmentCreate: Omit<IRoute, 'getURL'>
  apartmentSetup: Omit<IRoute, 'getURL'>
  normalInvoice: Omit<IRoute, 'getURL'>
  monthlyInvoice: Omit<IRoute, 'getURL'>
  overdueInvoice: Omit<IRoute, 'getURL'>
  overview: Omit<IRoute, 'getURL'>
  allRoom: Omit<IRoute, 'getURL'>
  roomReport: Omit<IRoute, 'getURL'>
}
