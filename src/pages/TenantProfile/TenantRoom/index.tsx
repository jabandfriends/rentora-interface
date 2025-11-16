import { PageHeader, PageSection } from '@/components/layout'
import { TenantRoomBody } from '@/components/pages/TenantProfile/TenantRoom'

const TenantRoom = () => {
  return (
    <PageSection>
      <PageHeader title="Room 204" description="2nd Floor, Building A" />
      <TenantRoomBody />
    </PageSection>
  )
}

export default TenantRoom
