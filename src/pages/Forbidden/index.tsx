import type { SetStateAction } from 'jotai'
import { FolderX, Home } from 'lucide-react'
import { type Dispatch, useCallback, useEffect, useState } from 'react'
import { type NavigateFunction, useNavigate } from 'react-router-dom'

import { Button } from '@/components/common'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/feature'
import { PageSection } from '@/components/layout'
import { ROUTES } from '@/constants'

const ForbiddenPage = () => {
  const navigate: NavigateFunction = useNavigate()
  const [countdown, setCountdown]: [number, Dispatch<SetStateAction<number>>] = useState(10)

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    const timer = setTimeout(() => {
      navigate(ROUTES.allApartment.path)
    }, 10000)

    // cleanup timers when component unmounts
    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [navigate])

  const handleNavigate = useCallback(() => {
    navigate(ROUTES.allApartment.path)
  }, [navigate])
  return (
    <PageSection className="flex min-h-[calc(100dvh-var(--header-height))] items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FolderX />
          </EmptyMedia>
          <EmptyTitle>403 - Forbidden</EmptyTitle>
          <EmptyDescription>
            You are not authorized to access this page. Redirecting to the home page in <strong>{countdown}</strong>{' '}
            seconds... <br />
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button className="flex items-center gap-x-2" size="sm" onClick={handleNavigate}>
            <Home size={16} />
            Take Me Home
          </Button>
        </EmptyContent>
      </Empty>
    </PageSection>
  )
}

export default ForbiddenPage
