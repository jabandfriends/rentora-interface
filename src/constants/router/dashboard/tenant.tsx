import { DASHBOARD_ROUTE_ID } from '@/constants'
import { ROUTES } from '@/constants/router/routes'
import { TENANT_ROLE } from '@/enum'
import TenantPage from '@/pages/Tenant/Tenant'
import TenantCreatePage from '@/pages/Tenant/TenantCreate'
import TenantUpdatePassword from '@/pages/Tenant/TenantPasswordUpdate'
import TenantUpdatePage from '@/pages/Tenant/TenantUpdate'
import RequireApartmentWrapper from '@/router/RequireApartmentWrapper'
import type { IRouter } from '@/types'

export const TENANT_SETTINGS_ROUTES: Array<IRouter> = [
  {
    path: ROUTES.tenantUpdate.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN, TENANT_ROLE.ACCOUNTING]} routeId={DASHBOARD_ROUTE_ID}>
        <TenantUpdatePage />
      </RequireApartmentWrapper>
    ),
  },

  {
    path: ROUTES.tenant.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN, TENANT_ROLE.ACCOUNTING]} routeId={DASHBOARD_ROUTE_ID}>
        <TenantPage />
      </RequireApartmentWrapper>
    ),
  },
  {
    path: ROUTES.tenantCreate.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN, TENANT_ROLE.ACCOUNTING]} routeId={DASHBOARD_ROUTE_ID}>
        <TenantCreatePage />
      </RequireApartmentWrapper>
    ),
  },
  {
    path: ROUTES.tenantUpdatePassword.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN, TENANT_ROLE.ACCOUNTING]} routeId={DASHBOARD_ROUTE_ID}>
        <TenantUpdatePassword />
      </RequireApartmentWrapper>
    ),
  },
]
