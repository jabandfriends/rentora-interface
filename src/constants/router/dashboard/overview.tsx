import { DASHBOARD_ROUTE_ID } from '@/constants'
import { ROUTES } from '@/constants/router/routes'
import { TENANT_ROLE } from '@/enum'
import OverviewPage from '@/pages/Overview'
import RequireApartmentWrapper from '@/router/RequireApartmentWrapper'
import type { IRouter } from '@/types'

export const OVERVIEW_ROUTES: Array<IRouter> = [
  {
    path: ROUTES.overview.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN]} routeId={DASHBOARD_ROUTE_ID}>
        <OverviewPage />
      </RequireApartmentWrapper>
    ),
  },
]
