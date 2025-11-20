import PageNotFound from '@/pages/PageNotFound'
import type { IRouter } from '@/types'

import { APARTMENT_SETTING_ROUTES } from './apartment-setting'
import { CONTRACT_ROUTES } from './contract'
import { INVOICE_ROUTES } from './invoice'
import { MAINTENANCE_ROUTES } from './maintenance'
import { OVERVIEW_ROUTES } from './overview'
import { PAYMENT_ROUTES } from './payment'
import { REPORT_ROUTES } from './report'
import { ROOM_ROUTES } from './room'
import { SUPPLY_ROUTES } from './supply'
import { TENANT_ROUTES, TENANT_SETTINGS_ROUTES } from './tenant'
import { UTILITY_ROUTES } from './utility'

export const DASHBOARD_ROUTES: Array<IRouter> = [
  ...APARTMENT_SETTING_ROUTES,
  ...OVERVIEW_ROUTES,
  ...INVOICE_ROUTES,
  ...MAINTENANCE_ROUTES,
  ...ROOM_ROUTES,
  ...PAYMENT_ROUTES,
  ...REPORT_ROUTES,
  ...SUPPLY_ROUTES,
  ...TENANT_SETTINGS_ROUTES,
  ...TENANT_ROUTES,
  ...UTILITY_ROUTES,
  ...CONTRACT_ROUTES,

  {
    path: '*',
    element: <PageNotFound />,
  },
]
