import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { LoadingPage } from '@/components/ui'
import { CONTRACT_STATUS, UnitStatus } from '@/enum'
import { useRentoraApiContractList, useRentoraApiMaintenanceList, useRentoraApiUnitList } from '@/hooks'

import OverviewHeader from './OverviewHeader'
import OverviewLeaseExpiration from './OverviewLeaseExpiration'
import OverviewMaintenanceAlert from './OverviewMaintenanceAlert'
import OverviewMaintenanceRequest from './OverviewMaintenanceRequest'
// import OverviewPaymentStatus from './OverviewPaymentStatus'
import OverviewStats from './OverviewStats'
import OverviewUpcomingRecurringMaintenance from './OverviewUpcomingRecurringMaintenance'
import OverviewVacantUnits from './OverviewVacantUnits'

const OverviewBody = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()

  const { data: recurringMaintenance, isLoading: isLoadingRecurringMaintenance } = useRentoraApiMaintenanceList({
    apartmentId: apartmentId,
    params: {
      size: 6,
      page: 1,
      sortBy: 'appointmentDate',
      sortDir: 'asc',
      status: 'pending',
      isRecurring: true,
    },
  })

  const {
    data: maintenanceRequests,
    metadata: { urgentCount, totalMaintenance },
    isLoading: isLoadingMaintenanceRequests,
  } = useRentoraApiMaintenanceList({
    apartmentId: apartmentId,
    params: {
      size: 4,
      page: 1,
      sortBy: 'appointmentDate',
      sortDir: 'asc',
      isRecurring: false,
    },
  })

  const {
    data: allRooms,
    metadata: { totalUnits, totalUnitsOccupied },
    isLoading: isLoadingAllRooms,
  } = useRentoraApiUnitList({
    apartmentId: apartmentId!,
    params: {
      size: 6,
      page: 1,
      sortBy: 'unitName',
      sortDir: 'asc',
      status: UnitStatus.available,
    },
  })

  //upcoming contract expiring
  const { data: contractExpiring, isLoading: isLoadingContractExpiring } = useRentoraApiContractList(apartmentId, {
    size: 4,
    page: 1,
    sortBy: 'endDate',
    sortDir: 'asc',
    contractStatus: CONTRACT_STATUS.ACTIVE,
  })

  const isDataLoading: boolean = useMemo(
    () =>
      isLoadingRecurringMaintenance || isLoadingMaintenanceRequests || isLoadingAllRooms || isLoadingContractExpiring,
    [isLoadingRecurringMaintenance, isLoadingMaintenanceRequests, isLoadingAllRooms, isLoadingContractExpiring],
  )
  const occupancyRate: number = useMemo(() => {
    return Math.round((totalUnitsOccupied / totalUnits) * 100)
  }, [totalUnitsOccupied, totalUnits])

  if (isDataLoading) {
    return <LoadingPage />
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <OverviewHeader />

      {/* Stats Grid */}
      <OverviewStats
        occupiedUnits={totalUnitsOccupied}
        totalUnits={totalUnits}
        occupancyRate={occupancyRate}
        monthlyRevenue={0} //mock
        maintenanceRequests={totalMaintenance}
        pendingPayments={0} //mock
      />

      {/* Urgent Maintenance Alert */}
      <OverviewMaintenanceAlert urgentCount={urgentCount} />

      {/* Upcoming Recurring Maintenance */}
      <OverviewUpcomingRecurringMaintenance maintenance={recurringMaintenance} />

      <div className="desktop:grid-cols-2 grid gap-6">
        <OverviewMaintenanceRequest maintenanceRequests={maintenanceRequests} />

        <OverviewLeaseExpiration leaseExpirations={contractExpiring} />
      </div>

      {/* Payment Status
      <OverviewPaymentStatus paymentStatus={paymentStatus} /> */}

      {/* Vacant Units */}
      <OverviewVacantUnits totalUnits={totalUnits} allRooms={allRooms} />
    </div>
  )
}

export default OverviewBody
