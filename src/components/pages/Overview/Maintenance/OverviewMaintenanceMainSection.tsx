import { MaintenanceCategoryMainSection } from './MaintenanceCategory'
import { MaintenanceStatisticBody } from './MaintenanceStatistic'
import { MaintenanceTrend } from './MaintenanceTrend'

const OverviewContractMainSection = () => {
  return (
    <div className="space-y-4">
      <div className="desktop:flex-row flex flex-col gap-4">
        <MaintenanceTrend className="flex-2" />
        <MaintenanceCategoryMainSection className="flex-1" />
      </div>
      <MaintenanceStatisticBody />
    </div>
  )
}

export default OverviewContractMainSection
