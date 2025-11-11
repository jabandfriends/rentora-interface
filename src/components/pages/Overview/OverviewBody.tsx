import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/feature'
import { LoadingPage } from '@/components/ui'
import { CONTRACT_STATUS, UnitStatus } from '@/enum'
import {
  useRentoraApiBuildingListNoPaginate,
  useRentoraApiContractList,
  useRentoraApiMaintenanceList,
  useRentoraApiUnitList,
  useTabQuery,
} from '@/hooks'

import { OverviewMaintenanceMainSection } from './Maintenance'
import { OverviewMainSection, OverviewStats } from './Overview'
import OverviewLeaseExpiration from './Overview/OverviewLeaseExpiration'
import OverviewMaintenanceAlert from './Overview/OverviewMaintenanceAlert'
import OverviewMaintenanceRequest from './Overview/OverviewMaintenanceRequest'
import OverviewUpcomingRecurringMaintenance from './Overview/OverviewUpcomingRecurringMaintenance'
import OverviewVacantUnits from './Overview/OverviewVacantUnits'
import OverviewHeader from './OverviewHeader'
import OverviewMonthlyUtilityBuildingandFloor from './OverviewMonthlyUtilityBuildingandFloor'
// import OverviewPaymentStatus from './OverviewPaymentStatus'
import OverviewApartmentUtility from './OverviewYearlyApartmentUtility'
import { OverviewPaymentMainSection } from './Payment'

const OverviewBody = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { currentTab, setTab } = useTabQuery('overview')
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
    metadata: { totalUnits, totalUnitsOccupied, totalUnitsAvailable },
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

  //building list
  const { data: buildings, isLoading: isLoadingBuildings } = useRentoraApiBuildingListNoPaginate({ apartmentId })

  const isDataLoading: boolean = useMemo(
    () =>
      isLoadingRecurringMaintenance ||
      isLoadingMaintenanceRequests ||
      isLoadingAllRooms ||
      isLoadingContractExpiring ||
      isLoadingBuildings,
    [
      isLoadingRecurringMaintenance,
      isLoadingMaintenanceRequests,
      isLoadingAllRooms,
      isLoadingContractExpiring,
      isLoadingBuildings,
    ],
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
      <OverviewStats
        totalBuildings={buildings?.length}
        occupiedUnits={totalUnitsOccupied}
        totalUnits={totalUnits}
        occupancyRate={occupancyRate}
        maintenanceRequests={totalMaintenance}
      />

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

      <OverviewApartmentUtility />

      <OverviewMonthlyUtilityBuildingandFloor />

      {/* Payment Status
      <OverviewPaymentStatus paymentStatus={paymentStatus} /> */}
      <Tabs defaultValue={currentTab}>
        <TabsList>
          <TabsTrigger value="overview" onClick={() => setTab('overview')}>
            Overview
          </TabsTrigger>
          <TabsTrigger value="maintenance" onClick={() => setTab('maintenance')}>
            Maintenance
          </TabsTrigger>
          <TabsTrigger value="payments" onClick={() => setTab('payments')}>
            Payments
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <OverviewMainSection
            totalUnitsAvailable={totalUnitsAvailable}
            allRooms={allRooms}
            urgentCount={urgentCount}
            recurringMaintenance={recurringMaintenance}
            maintenanceRequests={maintenanceRequests}
            contractExpiring={contractExpiring}
          />
        </TabsContent>
        <TabsContent value="maintenance">
          <OverviewMaintenanceMainSection />
        </TabsContent>
        <TabsContent value="payments">
          <OverviewPaymentMainSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default OverviewBody
