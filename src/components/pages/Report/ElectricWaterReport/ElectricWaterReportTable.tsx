import { PaginationBar } from '@/components/feature'
import {
  PageTableEmpty,
  PageTableLoading,
  PageTableSearchEmpty,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { ELECTRIC_WATER_REPORT_TABLE_HEADER } from '@/constants'
import type { IReportUtility } from '@/types'
import { formatCurrency } from '@/utilities'

type IElectricWaterReportTableProps = {
  data: Array<IReportUtility>
  isLoading: boolean
  isSearched: boolean
  isReadingDateSelected: boolean
  currentPage: number
  totalPages: number
  totalElements: number
  onPageChange: (page: number) => void
}

const ElectricWaterReportTable = ({
  data,
  isLoading,
  isSearched,
  isReadingDateSelected,
  currentPage,
  totalPages,
  totalElements,
  onPageChange,
}: IElectricWaterReportTableProps) => {
  if (isLoading) {
    return <PageTableLoading />
  }
  if (!isReadingDateSelected)
    return (
      <PageTableSearchEmpty
        message="Please select a meter reading date"
        subMessage="Please select a meter reading date to view utilities report"
      />
    )

  if (isSearched && !isLoading && data?.length === 0) {
    return (
      <PageTableSearchEmpty
        message="No utilities report found"
        subMessage="No utilities report found for this search"
      />
    )
  }

  if (!isLoading && (!data || data.length === 0)) {
    return <PageTableEmpty message="No utilities report found" />
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            {ELECTRIC_WATER_REPORT_TABLE_HEADER.map((header: string) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item: IReportUtility) => (
            <TableRow key={item.roomName + item.roomName}>
              <TableCell>{item.roomName}</TableCell>
              <TableCell>{item.buildingName}</TableCell>
              <TableCell>{item.tenantName}</TableCell>
              <TableCell>{item.electricUsage} Units</TableCell>
              <TableCell>
                {item.electricCost != null && item.electricCost >= 0 ? formatCurrency(item.electricCost) : '฿0'}
              </TableCell>
              <TableCell>{item.waterUsage} Units</TableCell>
              <TableCell>
                {item.waterCost != null && item.waterCost >= 0 ? formatCurrency(item.waterCost) : '฿0'}
              </TableCell>
              {item.electricCost != null && item.waterCost != null && item.electricCost + item.waterCost >= 0 ? (
                <TableCell>{formatCurrency(item.electricCost + item.waterCost)}</TableCell>
              ) : (
                <TableCell>฿0</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationBar
        page={currentPage}
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default ElectricWaterReportTable
