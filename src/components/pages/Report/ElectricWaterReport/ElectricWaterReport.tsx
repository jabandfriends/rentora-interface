import { ElectricWaterReportTable } from '@/components/pages/Report/ElectricWaterReport'
import { PageTableBar, PageTableHeader } from '@/components/ui'
import { ELECTRIC_WATER_REPORT_DATA, ELECTRIC_WATER_REPORT_STATS } from '@/constants'

const ElectricWaterReport = () => {
  return (
    <>
      <PageTableHeader
        title="Electric & Water Usage"
        description="Manage and view electric & water usage and bills"
        stats={ELECTRIC_WATER_REPORT_STATS}
      />
      <PageTableBar title="Total Amount" count="฿13,090,009" />
      {/* <PageTableSearch /> */}
      <ElectricWaterReportTable data={ELECTRIC_WATER_REPORT_DATA} />
    </>
  )
}

export default ElectricWaterReport
