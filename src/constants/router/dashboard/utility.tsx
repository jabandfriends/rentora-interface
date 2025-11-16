import { DASHBOARD_ROUTE_ID } from '@/constants'
import { ROUTES } from '@/constants/router/routes'
import { TENANT_ROLE } from '@/enum'
import MeterReadingCreatePage from '@/pages/MeterReading/MeterReadingCreatePage'
import MeterReadingListPage from '@/pages/MeterReading/MeterReadingListPage'
import RequireApartmentWrapper from '@/router/RequireApartmentWrapper'
import type { IRouter } from '@/types'

export const UTILITY_ROUTES: Array<IRouter> = [
  {
    path: ROUTES.meterReadingList.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN]} routeId={DASHBOARD_ROUTE_ID}>
        <MeterReadingListPage />
      </RequireApartmentWrapper>
    ),
  },
  {
    path: ROUTES.meterReadingCreate.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN]} routeId={DASHBOARD_ROUTE_ID}>
        <MeterReadingCreatePage />
      </RequireApartmentWrapper>
    ),
  },
]
