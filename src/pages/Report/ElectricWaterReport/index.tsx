import { PageHeader, PageSection } from '@/components/layout'
import { ElectricWaterReport } from '@/components/pages/Report/ElectricWaterReport'

const ElectricWaterReportPage = () => {
  return (
    <PageSection>
      <PageHeader
        title="Electric & Water Usage Management"
        description="Manage and view electric & water usage and bills for this apartment"
      />
      <ElectricWaterReport />
    </PageSection>
  )
}

export default ElectricWaterReportPage
