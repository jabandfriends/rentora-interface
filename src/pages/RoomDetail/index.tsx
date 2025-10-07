import { PageSection } from '@/components/layout'
import { RoomDetailBody, RoomDetailBreadcrumb } from '@/components/pages/RoomDetail'

const RoomDetail = () => {
  return (
    <PageSection>
      <RoomDetailBreadcrumb />
      <RoomDetailBody />
    </PageSection>
  )
}

export default RoomDetail
