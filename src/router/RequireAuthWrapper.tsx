import { type PropsWithChildren } from 'react'
import { Navigate, useLoaderData } from 'react-router-dom'

import { Spinner } from '@/components/common'
import { ROUTES } from '@/constants'
import type { Maybe } from '@/types'

const RequireAuthWrapper = ({ children }: PropsWithChildren) => {
  //hooks
  const { valid }: { valid: Maybe<boolean> } = useLoaderData()
  if (valid === undefined) {
    return (
      <div className="bg-page flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (!valid) {
    return <Navigate to={ROUTES.auth.path} replace />
  }

  return <>{children}</>
}

export default RequireAuthWrapper
