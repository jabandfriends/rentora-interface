import type { PropsWithChildren } from 'react'
import { Navigate, useLoaderData } from 'react-router-dom'

import { Spinner } from '@/components/common'
import { ROUTES } from '@/constants'
import { APARTMENT_STATUS } from '@/enum'
import type { Maybe } from '@/types'

const RequireApartmentWrapper = ({ children }: PropsWithChildren) => {
  const { status, id }: { status: Maybe<string>; id: Maybe<string> } = useLoaderData()

  if (status === undefined) {
    return (
      <div className="bg-page flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (status === APARTMENT_STATUS.INACTIVE || status === null) {
    return <Navigate to={ROUTES.allApartment.path} replace />
  }

  if (status === APARTMENT_STATUS.INCOMPLETE || status === APARTMENT_STATUS.IN_PROGRESS) {
    return <Navigate to={ROUTES.apartmentSetup.getUrl(id)} replace />
  }

  return <>{children}</>
}

export default RequireApartmentWrapper
