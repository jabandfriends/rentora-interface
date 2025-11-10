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
import OverviewHeader from './OverviewHeader'
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
      <Tabs defaultValue={currentTab}>
        <TabsList>
          <TabsTrigger value="overview" onClick={() => setTab('overview')}>
            Overview
          </TabsTrigger>
          <TabsTrigger value="maintenance" onClick={() => setTab('maintenance')}>
            Maintenance Analytics
          </TabsTrigger>
          <TabsTrigger value="payments" onClick={() => setTab('payments')}>
            Payments Analytics
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
