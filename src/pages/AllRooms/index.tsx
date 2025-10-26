import { PageHeader, PageSection } from '@/components/layout'
import { AllRooms } from '@/components/pages/AllRooms'

const AllRoomsPage = () => {
  return (
    <PageSection>
      <PageHeader
        title="Room Overview"
        description="Welcome! Browse and manage all available rooms and their categories on your dashboard."
      />
      <AllRooms />
    </PageSection>
  )
}

export default AllRoomsPage
