import { ChartColumnBig } from 'lucide-react'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'
import { PaginationBar, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/feature'
import { PageTableEmpty, PageTableSearchEmpty } from '@/components/ui'
import { DEFAULT_MONTHLY_UTILITY_BUILDING_LIST_DATA } from '@/constants'
import { useRentoraApiMonthlyUtilityBuildings } from '@/hooks'
import type { ISearchBarProps } from '@/types'

import OverviewMonthlyBuilding from './OverviewMonthlyBuilding'
import { MonthlyUtilitySelectFloor } from './OverviewMonthlyUtilityFloor'

const OverviewMonthlyUtilityBuilding = () => {
  const [selectedBuildingId, setSelectedBuildingId]: [string, Dispatch<SetStateAction<string>>] = useState('')
  const [selectedFloorId, setSelectedFloorId]: [string, Dispatch<SetStateAction<string>>] = useState('')

  const { apartmentId } = useParams<{ apartmentId: string }>()

  const { data: monthlyUtiltyBuilding, isLoading } = useRentoraApiMonthlyUtilityBuildings({
    apartmentId: apartmentId!,
    params: {
      size: DEFAULT_MONTHLY_UTILITY_BUILDING_LIST_DATA.size,
      buildingId: selectedBuildingId,
    },
  })

  //building select data
  const { data: buildingNumber } = useRentoraApiBuildingListNoPaginate({
    apartmentId: apartmentId!,
  })

  const BuildingSelected = monthlyUtiltyBuilding[0]

  const { data: floorNumber } = useRentoraApiFloorList({
    buildingId: BuildingSelected?.buildingID,
  })

  const { data: monthlyUtilityFloor } = useRentoraApiMonthlyUtilityFloor({
    apartmentId: apartmentId!,
    params: {
      buildingId: BuildingSelected?.buildingID,
      floorId: selectedFloorId,
    },
  })

  if (isLoading) {
    return <LoadingPage />
  }

  if (!floorNumber || floorNumber.length === 0) {
    return <PageTableEmpty message="No floors available in this building yet 🏢" />
  }

  const isUtilityDataEmpty = !BuildingSelected || Object.keys(BuildingSelected.utilityGroupName || {}).length === 0

  if (isSearched && monthlyUtiltyBuilding?.length === 0) {
    return <PageTableSearchEmpty message="No Building Utility" subMessage="No Building Utility found for this search" />
  }

  if (!monthlyUtiltyBuilding || monthlyUtiltyBuilding.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChartColumnBig className="h-5 w-5" />
            Building Utility
          </CardTitle>
        </CardHeader>
        <PageTableEmpty message="No Building Utility found" />
      </Card>
    )
  }

  return (
    <Card className="justify-start rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChartColumnBig className="size-5" />
          Building and Floor Utility
        </CardTitle>
        <CardDescription>Building Utility Summary</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="building">
          <TabsList className="border-theme-secondary-300 border">
            <TabsTrigger value="building">Building</TabsTrigger>
            <TabsTrigger value="floor">Floor</TabsTrigger>
          </TabsList>
          <TabsContent value="floor">
            <MonthlyUtilitySelectFloor props={{ buildingId: monthlyUtiltyBuilding?.[0].buildingID }} />
          </TabsContent>
          <TabsContent value="building">
            <OverviewMonthlyBuilding
              isSearched={isSearched}
              isBuildingLoading={isLoading}
              monthlyUtiltyBuilding={monthlyUtiltyBuilding}
              handleSearchChange={handleSearchChange}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default OverviewMonthlyUtilityBuilding
