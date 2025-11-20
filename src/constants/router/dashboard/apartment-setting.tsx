import { ROUTES } from '@/constants/router/routes'
import { TENANT_ROLE } from '@/enum'
import ApartmentSetting from '@/pages/ApartmentSetting'
import RequireApartmentWrapper from '@/router/RequireApartmentWrapper'
import type { IRouter } from '@/types'

import { DASHBOARD_ROUTE_ID } from './constants'

export const APARTMENT_SETTING_ROUTES: Array<IRouter> = [
  {
    path: ROUTES.apartmentSetting.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN]} routeId={DASHBOARD_ROUTE_ID}>
        <ApartmentSetting />
      </RequireApartmentWrapper>
    ),
  },
]
