//icon
import { Plus } from 'lucide-react'

//components
import { Button } from '@/components/common'
import { RoomReportTable } from '@/components/pages/Report/RoomReport'
import { PageTableHeader, PageTableSearch } from '@/components/ui'
import { ROOM_REPORT_DATA, ROOM_REPORT_STATS } from '@/constants'

export const RoomReport = () => {
  return (
    <>
      <PageTableHeader
        title="Room Report"
        description="Manage and view all room"
        stats={ROOM_REPORT_STATS}
        actionButton={
          <Button className="flex items-center gap-2">
            <Plus size={18} /> New Receipt
          </Button>
        }
      />
      <PageTableSearch />
      <RoomReportTable data={ROOM_REPORT_DATA} />
    </>
  )
}

export default RoomReport
