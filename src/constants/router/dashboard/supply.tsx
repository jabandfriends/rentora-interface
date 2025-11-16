import { DASHBOARD_ROUTE_ID } from '@/constants'
import { ROUTES } from '@/constants/router/routes'
import { TENANT_ROLE } from '@/enum'
import SupplyList from '@/pages/Supply'
import SupplyTransactions from '@/pages/SupplyTransactions'
import RequireApartmentWrapper from '@/router/RequireApartmentWrapper'
import type { IRouter } from '@/types'

export const SUPPLY_ROUTES: Array<IRouter> = [
  {
    path: ROUTES.supplyList.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN, TENANT_ROLE.ACCOUNTING]} routeId={DASHBOARD_ROUTE_ID}>
        <SupplyList />
      </RequireApartmentWrapper>
    ),
  },
  {
    path: ROUTES.supplyTransactions.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN, TENANT_ROLE.ACCOUNTING]} routeId={DASHBOARD_ROUTE_ID}>
        <SupplyTransactions />
      </RequireApartmentWrapper>
    ),
  },
]
