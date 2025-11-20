import { AlertTriangle } from 'lucide-react'
import { useCallback } from 'react'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/common'
import { Alert, AlertDescription } from '@/components/ui'
import { ROUTES } from '@/constants'

type IOverviewMaintenanceAlert = {
  urgentCount: number
}
const OverviewMaintenanceAlert = ({ urgentCount }: IOverviewMaintenanceAlert) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const navigate: NavigateFunction = useNavigate()
  const handleViewAll = useCallback(() => {
    navigate(ROUTES.maintenance.getPath(apartmentId!))
  }, [apartmentId, navigate])
  return (
    <>
      {urgentCount > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>
              <strong>{urgentCount} urgent maintenance items</strong> require attention within 48 hours
            </span>
            <Button variant="outline" size="sm" className="bg-white" onClick={handleViewAll}>
              View All
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </>
  )
}

export default OverviewMaintenanceAlert
