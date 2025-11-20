import { SearchBar } from '@/components/feature'
import { PageTableEmpty, PageTableSearchEmpty } from '@/components/ui'
import type { IMonthlyUtilityBuilding } from '@/types'

import { MonthlyUtilityBuildingCard } from './OverviewMonthlyUtilityBuilding'

type IOverviewMonthlyBuilding = {
  isBuildingLoading: boolean
  isSearched: boolean
  monthlyUtiltyBuilding: Array<IMonthlyUtilityBuilding>
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const OverviewMonthlyBuilding = ({
  isSearched,
  monthlyUtiltyBuilding,
  isBuildingLoading,
  handleSearchChange,
}: IOverviewMonthlyBuilding) => {
  if (!monthlyUtiltyBuilding || monthlyUtiltyBuilding.length == 0) {
    return <PageTableEmpty message="No Building Utility found" />
  }

  if (isSearched && monthlyUtiltyBuilding.length == 0) {
    return <PageTableSearchEmpty message="No Building Utility" subMessage="No Building Utility found for this search" />
  }

  return (
    <div className="space-y-2">
      <SearchBar onChange={handleSearchChange} placeholder="Search for building utility" />
      <div className="space-y-6">
        <div className="grid-cols grid gap-2">
          {monthlyUtiltyBuilding?.map((item: IMonthlyUtilityBuilding, index: number) => (
            <MonthlyUtilityBuildingCard key={index} item={item} isloading={isBuildingLoading} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default OverviewMonthlyBuilding
