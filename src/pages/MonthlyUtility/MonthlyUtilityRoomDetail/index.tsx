import { PageSection } from '@/components/layout'
import { MonthlyUtilityUnitElectChart, MonthlyUtilityUnitWaterChart } from '@/components/pages/MonthlyUtility'
import MonthlyUtilityUnit from '@/components/pages/MonthlyUtility/MonthlyUtilityUnit'

const MonthlyUtilityRoomDetail = () => {
  return (
    <PageSection>
      <MonthlyUtilityUnit />
      <MonthlyUtilityUnitElectChart />
      <MonthlyUtilityUnitWaterChart />
    </PageSection>
  )
}

export default MonthlyUtilityRoomDetail
