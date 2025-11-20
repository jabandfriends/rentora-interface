import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/feature'
import { PageTableEmpty, PageTableSearchEmpty } from '@/components/ui'
import type { IMonthlyUtilityBuilding } from '@/types'

import { MonthlyUtilityBuildingCard } from './OverviewMonthlyUtilityBuilding'
import { MonthlyUtilitySelectFloor } from './OverviewMonthlyUtilityFloor'

type IOverviewMonthlyBuilding = {
  isBuildingLoading: boolean
  isSearched: boolean
  monthlyUtiltyBuilding: Array<IMonthlyUtilityBuilding>
}
const OverviewMonthlyBuilding = ({
  isSearched,
  monthlyUtiltyBuilding,
  isBuildingLoading,
}: IOverviewMonthlyBuilding) => {
  if (!monthlyUtiltyBuilding || monthlyUtiltyBuilding.length == 0) {
    return <PageTableEmpty message="No Building Utility found" />
  }

  if (isSearched && monthlyUtiltyBuilding.length == 0) {
    return <PageTableSearchEmpty message="No Building Utility" subMessage="No Building Utility found for this search" />
  }

  return (
    <Tabs defaultValue="Building">
      <TabsList className="border-theme-secondary-300 border">
        <TabsTrigger value="Building">Building</TabsTrigger>
        <TabsTrigger value="Floor">Floor</TabsTrigger>
      </TabsList>
      <TabsContent value="Building">
        <div className="space-y-6">
          <div className="grid-cols grid gap-2">
            {monthlyUtiltyBuilding?.map((item: IMonthlyUtilityBuilding, index: number) => (
              <MonthlyUtilityBuildingCard key={index} item={item} isloading={isBuildingLoading} />
            ))}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="Floor">
        <MonthlyUtilitySelectFloor buildingId={monthlyUtiltyBuilding[0].buildingID} />
      </TabsContent>
    </Tabs>
  )
}

export default OverviewMonthlyBuilding
