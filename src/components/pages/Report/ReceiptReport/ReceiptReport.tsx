import { Plus } from 'lucide-react'

import { Button } from '@/components/common'
import { ReceiptReportTable } from '@/components/pages/Report/ReceiptReport'
import { PageTableHeader, PageTableSearch } from '@/components/ui'
import { RECEIPT_REPORT_DATA, RECEIPT_REPORT_STATS } from '@/constants'

export const ReceiptReport = () => {
  return (
    <>
      <PageTableHeader
        title="Receipt Report"
        description="Manage and view all customer receipt"
        stats={RECEIPT_REPORT_STATS}
        actionButton={
          <Button className="flex items-center gap-2">
            <Plus size={18} /> New Receipt
          </Button>
        }
      />
      <PageTableSearch />
      <ReceiptReportTable data={RECEIPT_REPORT_DATA} />
    </>
  )
}

export default ReceiptReport
