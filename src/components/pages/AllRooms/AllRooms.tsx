import { PageTableHeader, PageTableSearch } from '@/components/ui'
import { ALL_ROOMS_DATA, All_ROOMS_STAT } from '@/constants'

import AllRoomsTable from './AllRoomsTable'

const AllRooms = () => {
    return (
        <>
            <PageTableHeader title="All Rooms" description="asdfghjhjk" stats={All_ROOMS_STAT} />
            <PageTableSearch />
            <AllRoomsTable data={ALL_ROOMS_DATA} />
        </>
    )
}

export default AllRooms
