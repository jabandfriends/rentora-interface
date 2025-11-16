import { DASHBOARD_ROUTE_ID } from '@/constants'
import { ROUTES } from '@/constants/router/routes'
import { TENANT_ROLE } from '@/enum'
import ElectricWaterReportPage from '@/pages/Report/ElectricWaterReport'
import RequireApartmentWrapper from '@/router/RequireApartmentWrapper'
import type { IRouter } from '@/types'

export const REPORT_ROUTES: Array<IRouter> = [
  {
    path: ROUTES.electricWaterReport.path,
    element: (
      <RequireApartmentWrapper
        allowedRoles={[TENANT_ROLE.ADMIN, TENANT_ROLE.ACCOUNTING, TENANT_ROLE.MAINTENANCE]}
        routeId={DASHBOARD_ROUTE_ID}
      >
        <ElectricWaterReportPage />
      </RequireApartmentWrapper>
    ),
  },
]
