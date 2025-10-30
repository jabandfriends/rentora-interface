import { jwtDecode } from 'jwt-decode'
import { type PropsWithChildren, useEffect, useMemo } from 'react'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'

import { LoadingPage } from '@/components/ui'
import { ROUTES } from '@/constants'
import type { Maybe } from '@/types'
import { parseStorageKey } from '@/utilities'

const RequireAuthWrapper = ({ children }: PropsWithChildren) => {
  const { valid, mustChangePassword }: { valid: Maybe<boolean>; mustChangePassword: Maybe<boolean> } = useLoaderData()
  const location = useLocation()
  const navigate = useNavigate()

  // loading state for loader-based check
  const isLoading = useMemo(() => valid === undefined || mustChangePassword === undefined, [valid, mustChangePassword])

  useEffect(() => {
    const auth: Maybe<string> = localStorage.getItem(parseStorageKey('auth'))
    if (!auth) {
      navigate(ROUTES.auth.path)
      return
    }

    const { accessToken }: { accessToken: string } = JSON.parse(auth)
    try {
      const { exp }: { exp?: number } = jwtDecode(accessToken)
      if (!exp || exp * 1000 < Date.now()) {
        localStorage.removeItem('auth')
        navigate(ROUTES.auth.path)
        return
      }
    } catch {
      localStorage.removeItem('auth')
      navigate(ROUTES.auth.path)
      return
    }

    // Loader-based check
    if (!valid) {
      navigate(ROUTES.auth.path)
      return
    }

    if (mustChangePassword && location.pathname !== ROUTES.firstTimePasswordReset.path) {
      navigate(ROUTES.firstTimePasswordReset.path)
      return
    }

    if (!mustChangePassword && location.pathname === ROUTES.firstTimePasswordReset.path) {
      navigate(ROUTES.allApartment.path)
      return
    }
  }, [location.pathname, valid, mustChangePassword, navigate])

  if (isLoading) {
    return <LoadingPage />
  }

  return <>{children}</>
}

export default RequireAuthWrapper
