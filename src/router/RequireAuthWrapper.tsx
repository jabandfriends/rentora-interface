import { type PropsWithChildren } from 'react'
import type { Location } from 'react-router-dom'
import { Navigate, useLoaderData, useLocation } from 'react-router-dom'

import { Spinner } from '@/components/common'
import { ROUTES } from '@/constants'
import type { Maybe } from '@/types'

const RequireAuthWrapper = ({ children }: PropsWithChildren) => {
  //hooks
  const { valid, mustChangePassword }: { valid: Maybe<boolean>; mustChangePassword: Maybe<boolean> } = useLoaderData()
  const location: Location = useLocation()
  if (valid === undefined || mustChangePassword === undefined) {
    return (
      <div className="bg-page flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (!valid) {
    return <Navigate to={ROUTES.auth.path} replace />
  }

  if (mustChangePassword && location.pathname !== ROUTES.firstTimePasswordReset.path) {
    return <Navigate to={ROUTES.firstTimePasswordReset.path} replace />
  }

  if (!mustChangePassword && location.pathname === ROUTES.firstTimePasswordReset.path) {
    return <Navigate to={ROUTES.allApartment.path} replace />
  }

  return <>{children}</>
}

export default RequireAuthWrapper
