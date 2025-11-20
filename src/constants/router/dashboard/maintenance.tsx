import { DASHBOARD_ROUTE_ID } from '@/constants'
import { ROUTES } from '@/constants/router/routes'
import { TENANT_ROLE } from '@/enum'
import MaintenanceCreate from '@/pages/Maintenance/MaintenanceCreate'
import MaintenanceDetailPage from '@/pages/Maintenance/MaintenanceDetailPage'
import MaintenancePage from '@/pages/Maintenance/MaintenanceTask'
import MaintenanceUpdate from '@/pages/Maintenance/MaintenanceUpdate'
import RequireApartmentWrapper from '@/router/RequireApartmentWrapper'
import type { IRouter } from '@/types'

export const MAINTENANCE_ROUTES: Array<IRouter> = [
  {
    path: ROUTES.maintenance.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN, TENANT_ROLE.MAINTENANCE]} routeId={DASHBOARD_ROUTE_ID}>
        <MaintenancePage />
      </RequireApartmentWrapper>
    ),
  },
  {
    path: ROUTES.maintenanceCreate.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN, TENANT_ROLE.MAINTENANCE]} routeId={DASHBOARD_ROUTE_ID}>
        <MaintenanceCreate />
      </RequireApartmentWrapper>
    ),
  },
  {
    path: ROUTES.maintenanceDetail.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN, TENANT_ROLE.MAINTENANCE]} routeId={DASHBOARD_ROUTE_ID}>
        <MaintenanceDetailPage />
      </RequireApartmentWrapper>
    ),
  },
  {
    path: ROUTES.maintenanceUpdate.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN, TENANT_ROLE.MAINTENANCE]} routeId={DASHBOARD_ROUTE_ID}>
        <MaintenanceUpdate />
      </RequireApartmentWrapper>
    ),
  },
]
