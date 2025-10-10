//icon
import { Building2, CheckCircle, Plus, XCircle } from 'lucide-react'
import { type ChangeEvent, type Dispatch, type SetStateAction, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

//components
import { Button } from '@/components/common'
import { RoomReportTable } from '@/components/pages/Report/RoomReport'
import { PageTableHeader } from '@/components/ui'
import { DEFAULT_REPORT_ROOM_LIST_DATA } from '@/constants'
import { useRentoraApiReportRoom } from '@/hooks'
import type { IStatsCardProps } from '@/types'

import RoomReportSearchBar from './RoomReportSearchBar'

const RoomReport = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState(
    DEFAULT_REPORT_ROOM_LIST_DATA.page,
  )
  //data //stub
  const {
    data: reportRoomList,
    isLoading,
    pagination,
    metadata,
  } = useRentoraApiReportRoom({
    enabled: !!apartmentId,
    apartmentId, //stub
    params: {
      page: currentPage,
      size: 10,
      sortBy: 'issueDate',
      sortDir: 'desc',
      search: '',
    },
  })
  const roomReportStats: Array<IStatsCardProps> = useMemo(() => {
    return [
      {
        title: 'Rooms',
        count: metadata?.totalRooms ?? 0,
        icon: <Building2 size={22} />,
        type: 'primary',
      },
      {
        title: 'Available',
        count: metadata?.availableRooms ?? 0,
        icon: <CheckCircle size={22} />,
        type: 'success',
      },
      {
        title: 'Unavailable',
        count: metadata?.unavailableRooms ?? 0,
        icon: <XCircle size={22} />,
        type: 'error',
      },
    ]
  }, [metadata])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleSearchChange(_e: ChangeEvent<HTMLInputElement>): void {
    throw new Error('Function not implemented.')
  }
  function handleSortChange(value: string): void {
    console.log('Sort changed:', value)
  }
  return (
    <>
      <PageTableHeader
        title="Room Report"
        description="Manage and view all room"
        stats={roomReportStats}
        actionButton={
          <Button className="flex items-center gap-2">
            <Plus size={18} /> New Receipt
          </Button>
        }
      />
      <RoomReportSearchBar
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
        sortEnum={{ Ascending: 'asc', Descending: 'desc' }}
      />
      <RoomReportTable
        data={reportRoomList}
        isLoading={isLoading}
        isSearched={false}
        currentPage={pagination?.page ?? 0}
        totalPages={pagination?.totalPages ?? 0}
        totalElements={pagination?.totalElements ?? 0}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
    </>
  )
}

export default RoomReport
