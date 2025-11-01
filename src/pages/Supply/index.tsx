import { PageHeader, PageSection } from '@/components/layout'
import { SupplyBody } from '@/components/pages/Supply'

const SupplyList = () => {
  return (
    <PageSection>
      <PageHeader title="Supplies Management" description="Easily manage and track all your supplies here!" />
      <SupplyBody />
    </PageSection>
  )
}

export default SupplyList
