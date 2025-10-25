import { PageSection } from '@/components/layout'
import { MonthUnilityUnitWater, MonthUtilityUnitElect } from '@/components/pages/MonthlyUtility'
import MonthlyUtilityUnit from '@/components/pages/MonthlyUtility/MonthlyUtilityUnit'

const MonthlyUtilityRoomDetail = () => {
  return (
    <PageSection>
      <MonthlyUtilityUnit />
      <MonthUtilityUnitElect />
      <MonthUnilityUnitWater />
    </PageSection>
  )
}

export default MonthlyUtilityRoomDetail
