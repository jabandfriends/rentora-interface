import { MaintenanceStatisticBody } from './MaintenanceStatistic'
import { MaintenanceTrend } from './MaintenanceTrend'

const OverviewContractMainSection = () => {
  return (
    <div className="space-y-4">
      <MaintenanceTrend />
      <MaintenanceStatisticBody />
    </div>
  )
}

export default OverviewContractMainSection
