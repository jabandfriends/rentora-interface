import { Eye, ListCheck } from 'lucide-react'
import { useCallback } from 'react'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import type { VariantProps } from 'tailwind-variants'

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'
import { Badge } from '@/components/ui'
import { ROUTES } from '@/constants'
import { MAINTENANCE_PRIORITY, MAINTENANCE_STATUS } from '@/enum'
import type { IMaintenance } from '@/types'
import { formatDate } from '@/utilities'

type IMaintenanceLatestProps = {
  maintenanceRequests: Array<IMaintenance>
  isLoading: boolean
}
const MaintenanceLatest = ({ maintenanceRequests }: IMaintenanceLatestProps) => {
  const navigate: NavigateFunction = useNavigate()
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const getPriorityVariant = useCallback((priority: MAINTENANCE_PRIORITY): VariantProps<typeof Badge>['variant'] => {
    switch (priority) {
      case MAINTENANCE_PRIORITY.HIGH:
        return 'warning'
      case MAINTENANCE_PRIORITY.NORMAL:
        return 'default'
      case MAINTENANCE_PRIORITY.LOW:
        return 'secondary'
      case MAINTENANCE_PRIORITY.URGENT:
        return 'error'
      default:
        return 'secondary'
    }
  }, [])
  const getStatusBadge = useCallback((status: MAINTENANCE_STATUS): VariantProps<typeof Badge>['variant'] => {
    switch (status) {
      case MAINTENANCE_STATUS.IN_PROGRESS:
        return 'default'
      case MAINTENANCE_STATUS.PENDING:
        return 'warning'
      case MAINTENANCE_STATUS.COMPLETED:
        return 'success'
      case MAINTENANCE_STATUS.CANCELLED:
        return 'error'
      default:
        return 'default'
    }
  }, [])

  const navigateToMaintenanceRequests = useCallback(() => {
    navigate(ROUTES.maintenance.getPath(apartmentId))
  }, [navigate, apartmentId])
  return (
    <Card className="justify-start space-y-2 rounded-2xl">
      <CardHeader className="flex items-center gap-2">
        <ListCheck className="bg-theme-primary text-theme-white size-8 rounded-lg p-1" />
        <div>
          <CardTitle>Maintenance Latest</CardTitle>
          <CardDescription>View the latest maintenance requests for your apartment.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="desktop:grid-cols-2 grid gap-4 space-y-3">
          {maintenanceRequests.map((request) => (
            <div
              key={request.id}
              className="border-theme-secondary-300 hover:bg-theme-secondary-100 rounded-lg border p-3 transition-colors duration-200"
            >
              <div className="mb-2 flex items-start justify-between">
                <div className="flex-1">
                  <div className="desktop:items-center desktop:flex-row mb-1 flex flex-col gap-2">
                    <Badge variant="default">{request.unitName}</Badge>
                    <div className="flex items-center gap-2">
                      <Badge className="capitalize" variant={getPriorityVariant(request.priority)}>
                        {request.priority}
                      </Badge>
                      <Badge className="capitalize" variant={getStatusBadge(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-body-2 font-medium">{request.title}</p>
                  <p className="text-body-2 text-theme-secondary mt-1">
                    Reported: {formatDate(new Date(request.createdAt))}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button className="flex items-center gap-x-2" variant="outline" block onClick={navigateToMaintenanceRequests}>
          <Eye className="size-4" /> View All Requests
        </Button>
      </CardContent>
    </Card>
  )
}

export default MaintenanceLatest
