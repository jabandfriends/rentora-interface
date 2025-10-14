import { PageSection } from '@/components/layout'
import { MeterReadingCreateBreadcrumb, MeterReadingForm } from '@/components/pages/MeterReading/MeterReadingCreatePage'
import { PageTableHeader } from '@/components/ui'

const MeterReadingCreatePage = () => {
  return (
    <PageSection>
      <MeterReadingCreateBreadcrumb />
      <PageTableHeader
        title="Create New Reading"
        description="Record water and electricity consumption for all rooms"
      />
      <MeterReadingForm />
    </PageSection>
  )
}

export default MeterReadingCreatePage
