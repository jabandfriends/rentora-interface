import { type PropsWithChildren, useMemo } from 'react'
import type { Location } from 'react-router-dom'
import { Navigate, useLoaderData, useLocation, useRouteLoaderData } from 'react-router-dom'

import { Spinner } from '@/components/common'
import { ROUTES } from '@/constants'
import { APARTMENT_STATUS, TENANT_ROLE } from '@/enum'
import type { Maybe } from '@/types'

const RequireApartmentWrapper = ({
  children,
  allowedRoles,
  routeId,
}: PropsWithChildren<{ allowedRoles: Array<TENANT_ROLE>; routeId?: string }>) => {
  const currentLoaderData = useLoaderData() as
    | { status?: Maybe<string>; id?: Maybe<string>; userRole?: Maybe<TENANT_ROLE> }
    | undefined

  // Always call useRouteLoaderData - it returns null if routeId is undefined or invalid
  const parentLoaderData = useRouteLoaderData((routeId || '') as string) as {
    status?: Maybe<string>
    id?: Maybe<string>
    userRole?: Maybe<TENANT_ROLE>
  } | null

  // Use parent loader data if routeId is provided and parent data exists, otherwise use current route data
  const { status, id, userRole }: { status?: Maybe<string>; id?: Maybe<string>; userRole?: Maybe<TENANT_ROLE> } =
    useMemo(
      () => (routeId && parentLoaderData ? parentLoaderData : currentLoaderData || {}),
      [routeId, parentLoaderData, currentLoaderData],
    )

  const location: Location = useLocation()

  if (status === undefined || userRole === undefined) {
    return (
      <div className="bg-page flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    )
  }

  //role check if user role is not in allowed roles, redirect to forbidden page
  if (userRole && !allowedRoles.includes(userRole)) {
    return <Navigate to={ROUTES.forbidden.path} replace />
  }

  // apartment = ACTIVE , user try to access setup page -> redirect to all apartments
  if (status === APARTMENT_STATUS.ACTIVE && location.pathname.startsWith(ROUTES.apartmentSetup.getUrl(id))) {
    return <Navigate to={ROUTES.allApartment.path} replace />
  }

  // apartment = INACTIVE or null -> redirect to all apartments
  if (status === APARTMENT_STATUS.INACTIVE || status === null) {
    return <Navigate to={ROUTES.allApartment.path} replace />
  }

  // apartment = INCOMPLETE/IN_PROGRESS and user is NOT already in setup -> redirect to setup
  if (
    (status === APARTMENT_STATUS.INCOMPLETE || status === APARTMENT_STATUS.IN_PROGRESS) &&
    !location.pathname.startsWith(ROUTES.apartmentSetup.getUrl(id))
  ) {
    return <Navigate to={ROUTES.apartmentSetup.getUrl(id)} replace />
  }

  return <>{children}</>
}

export default RequireApartmentWrapper
