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
    <div className="bg-theme-light flex flex-col gap-y-3 rounded-lg p-5">
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
              <TableCell>{item.tenantName}</TableCell>
              <TableCell>{item.electricUsage} Units</TableCell>
              <TableCell>{formatCurrency(item.electricCost)}</TableCell>
              <TableCell>{item.waterUsage} Units</TableCell>
              <TableCell>{formatCurrency(item.waterCost)}</TableCell>
              <TableCell>{formatCurrency(item.electricCost + item.waterCost)}</TableCell>
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
