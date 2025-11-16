import { DASHBOARD_ROUTE_ID } from '@/constants'
import { ROUTES } from '@/constants/router/routes'
import { TENANT_ROLE } from '@/enum'
import ContractCreate from '@/pages/ContractCreate'
import ContractDetail from '@/pages/ContractDetail'
import RequireApartmentWrapper from '@/router/RequireApartmentWrapper'
import type { IRouter } from '@/types'

export const CONTRACT_ROUTES: Array<IRouter> = [
  {
    path: ROUTES.contractCreate.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN]} routeId={DASHBOARD_ROUTE_ID}>
        <ContractCreate />
      </RequireApartmentWrapper>
    ),
  },
  {
    path: ROUTES.contractDetail.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN]} routeId={DASHBOARD_ROUTE_ID}>
        <ContractDetail />
      </RequireApartmentWrapper>
    ),
  },
]
