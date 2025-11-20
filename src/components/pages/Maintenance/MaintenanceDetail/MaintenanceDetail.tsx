import { useParams } from 'react-router-dom'

import { Badge, EmptyPage, LoadingPage } from '@/components/ui'
import { useRentoraApiMaintenanceDetail } from '@/hooks'

import MaintenanceBreadcrumb from './MaintenanceBreadcrumb'
import MaintenanceDescription from './MaintenanceDescription'
import MaintenanceRequestDetail from './MaintenanceRequestDetail'
import MaintenanceSupplyUsage from './MaintenanceSupplyUsage'
import MaintenanceTenantInformation from './MaintenanceTenantInformation'

const MaintenanceDetail = () => {
  //param
  const { apartmentId, id } = useParams<{ apartmentId: string; id: string }>()

  //fetch maintenance detail
  const { data: maintenance, isLoading } = useRentoraApiMaintenanceDetail({ apartmentId, maintenanceId: id })

  if (isLoading) {
    return <LoadingPage />
  }

  if (!maintenance) {
    return <EmptyPage title="Maintenance Not Found" description="The maintenance you're looking for doesn't exist." />
  }

  return (
    <div className="space-y-4">
      <MaintenanceBreadcrumb />

      <div className="desktop:flex-row flex flex-col items-start justify-between gap-y-2">
        <div>
          <h2>{maintenance.title}</h2>
          <p className="text-theme-secondary text-body-2">Request ID: {maintenance.ticketNumber}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="warning" className="capitalize">
            {maintenance.status}
          </Badge>
          <Badge variant="default" className="capitalize">
            {maintenance.priority} Priority
          </Badge>
        </div>
      </div>
      <div className="gap-6">
        {/* Main Content */}
        <div className="space-y-6">
          <div className="grid gap-4">
            <MaintenanceDescription description={maintenance.description} />
          </div>

          <MaintenanceSupplyUsage suppliesUsage={maintenance.suppliesUsage || []} />

          <div className="desktop:grid-cols-2 grid gap-4">
            <MaintenanceRequestDetail maintenance={maintenance} />
            <MaintenanceTenantInformation {...maintenance} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MaintenanceDetail
