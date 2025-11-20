import { useParams } from 'react-router-dom'

import { useRentoraApiMaintenanceList } from '@/hooks'

import { MaintenanceCategoryMainSection } from './MaintenanceCategory'
import { MaintenanceLatest } from './MaintenanceLatest'
import { MaintenanceStatisticBody } from './MaintenanceStatistic'
import { MaintenanceTrend } from './MaintenanceTrend'

const OverviewContractMainSection = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { data: maintenanceRequests, isLoading: isLoadingMaintenanceRequests } = useRentoraApiMaintenanceList({
    apartmentId: apartmentId,
    params: {
      size: 4,
      page: 1,
      sortBy: 'createdAt',
      sortDir: 'desc',
    },
  })
  return (
    <div className="space-y-4">
      <MaintenanceLatest maintenanceRequests={maintenanceRequests} isLoading={isLoadingMaintenanceRequests} />
      <div className="desktop:flex-row flex flex-col gap-4">
        <MaintenanceTrend className="flex-2" />
        <MaintenanceCategoryMainSection className="flex-1" />
      </div>
      <MaintenanceStatisticBody />
    </div>
  )
}

export default OverviewContractMainSection
