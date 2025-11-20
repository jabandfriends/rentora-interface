import { DASHBOARD_ROUTE_ID } from '@/constants'
import { ROUTES } from '@/constants/router/routes'
import { TENANT_ROLE } from '@/enum'
import AllRoomsPage from '@/pages/AllRooms'
import RoomDetail from '@/pages/RoomDetail'
import RequireApartmentWrapper from '@/router/RequireApartmentWrapper'
import type { IRouter } from '@/types'

export const ROOM_ROUTES: Array<IRouter> = [
  {
    path: ROUTES.allRoom.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN, TENANT_ROLE.ACCOUNTING]} routeId={DASHBOARD_ROUTE_ID}>
        <AllRoomsPage />
      </RequireApartmentWrapper>
    ),
  },
  {
    path: ROUTES.roomDetail.path,
    element: (
      <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN, TENANT_ROLE.ACCOUNTING]} routeId={DASHBOARD_ROUTE_ID}>
        <RoomDetail />
      </RequireApartmentWrapper>
    ),
  },
]
