import { Wrench } from 'lucide-react'
import { useCallback } from 'react'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'
import { Badge } from '@/components/ui'
import { ROUTES } from '@/constants'

type IOverviewMaintenanceRequestProps = {
  maintenanceRequests: Array<{
    unit: string
    issue: string
    priority: string
    reportedDate: string
    status: string
  }>
}
const OverviewMaintenanceRequest = ({ maintenanceRequests }: IOverviewMaintenanceRequestProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const navigate: NavigateFunction = useNavigate()
  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'error'
      case 'medium':
        return 'default'
      default:
        return 'secondary'
    }
  }
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-progress':
        return (
          <Badge variant="default" className="font-mono">
            In Progress
          </Badge>
        )
      case 'pending':
        return (
          <Badge variant="secondary" className="font-mono">
            Pending
          </Badge>
        )
      default:
        return (
          <Badge variant="default" className="font-mono">
            Completed
          </Badge>
        )
    }
  }

  const handleViewAll = useCallback(() => {
    navigate(ROUTES.maintenance.getPath(apartmentId))
  }, [navigate, apartmentId])
  return (
    <Card className="justify-start rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          Current Maintenance Requests
        </CardTitle>
        <CardDescription>Active maintenance issues reported by tenants</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {maintenanceRequests.map((request, idx) => (
            <div
              key={idx}
              className="border-theme-secondary-300 hover:bg-theme-secondary-100 rounded-lg border p-3 transition-colors duration-200"
            >
              <div className="mb-2 flex items-start justify-between">
                <div className="flex-1">
                  <div className="desktop:items-center desktop:flex-row mb-1 flex flex-col gap-2">
                    <Badge variant="default" className="font-mono">
                      Unit {request.unit}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Badge className="capitalize" variant={getPriorityVariant(request.priority)}>
                        {request.priority}
                      </Badge>
                      {getStatusBadge(request.status)}
                    </div>
                  </div>
                  <p className="text-body-2 font-medium">{request.issue}</p>
                  <p className="text-body-2 text-theme-secondary mt-1">Reported: {request.reportedDate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="mt-4 w-full" onClick={handleViewAll}>
          View All Requests
        </Button>
      </CardContent>
    </Card>
  )
}

export default OverviewMaintenanceRequest
