import type { PropsWithChildren } from 'react'
import type { Location } from 'react-router-dom'
import { Navigate, useLoaderData, useLocation } from 'react-router-dom'

import { Spinner } from '@/components/common'
import { ROUTES } from '@/constants'
import { APARTMENT_STATUS } from '@/enum'
import type { Maybe } from '@/types'

const RequireApartmentWrapper = ({ children }: PropsWithChildren) => {
  const { status, id }: { status: Maybe<string>; id: Maybe<string> } = useLoaderData()
  const location: Location = useLocation()
  if (status === undefined) {
    return (
      <div className="bg-page flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    )
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
