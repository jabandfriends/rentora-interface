import type { IContractSummary, IMaintenance, IUnit } from '@/types'

import OverviewLeaseExpiration from './OverviewLeaseExpiration'
import OverviewMaintenanceAlert from './OverviewMaintenanceAlert'
import OverviewMaintenanceRequest from './OverviewMaintenanceRequest'
import OverviewUpcomingRecurringMaintenance from './OverviewUpcomingRecurringMaintenance'
import OverviewVacantUnits from './OverviewVacantUnits'

type IOverviewMainSectionProps = {
  totalUnitsAvailable: number
  allRooms: Array<IUnit>
  urgentCount: number
  recurringMaintenance: Array<IMaintenance>
  maintenanceRequests: Array<IMaintenance>
  contractExpiring: Array<IContractSummary>
}
const OverviewMainSection = ({
  totalUnitsAvailable,
  allRooms,
  urgentCount,
  recurringMaintenance,
  maintenanceRequests,
  contractExpiring,
}: IOverviewMainSectionProps) => {
  return (
    <div className="space-y-4">
      {/* Stats Grid */}

      {/* Vacant Units */}
      <OverviewVacantUnits totalUnits={totalUnitsAvailable} allRooms={allRooms} />

      {/* Urgent Maintenance Alert */}
      <OverviewMaintenanceAlert urgentCount={urgentCount} />

      {/* Upcoming Recurring Maintenance */}
      <OverviewUpcomingRecurringMaintenance maintenance={recurringMaintenance} />

      <div className="desktop:grid-cols-2 grid gap-6">
        <OverviewMaintenanceRequest maintenanceRequests={maintenanceRequests} />

        <OverviewLeaseExpiration leaseExpirations={contractExpiring} />
      </div>
    </div>
  )
}

export default OverviewMainSection
