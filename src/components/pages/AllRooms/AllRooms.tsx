import AllRoomsTable from '@/components/pages/AllRooms/AllRoomsTable'
import { PageTableHeader } from '@/components/ui'
import { ALL_ROOMS_DATA, All_ROOMS_STAT } from '@/constants'

const AllRooms = () => {
  return (
    <>
      <PageTableHeader title="All Rooms" description="All rooms with category dashboard" stats={All_ROOMS_STAT} />
      {/* <PageTableSearch /> */}
      <AllRoomsTable data={ALL_ROOMS_DATA} />
    </>
  )
}

export default AllRooms
