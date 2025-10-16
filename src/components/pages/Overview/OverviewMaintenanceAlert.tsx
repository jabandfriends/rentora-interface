import { AlertTriangle } from 'lucide-react'

import { Button } from '@/components/common'
import { Alert, AlertDescription } from '@/components/ui'

type IOverviewMaintenanceAlert = {
  upcomingMaintenance: Array<{
    unit: string
    type: string
    dueDate: string
    daysUntil: number
    recurring: string
    lastCompleted: string
    priority: string
    tenant: string
  }>
}
const OverviewMaintenanceAlert = ({ upcomingMaintenance }: IOverviewMaintenanceAlert) => {
  return (
    <>
      {upcomingMaintenance.filter((m) => m.daysUntil <= 2).length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>
              <strong>{upcomingMaintenance.filter((m) => m.daysUntil <= 2).length} urgent maintenance items</strong>{' '}
              require attention within 48 hours
            </span>
            <Button variant="outline" size="sm" className="bg-white">
              View All
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </>
  )
}

export default OverviewMaintenanceAlert
