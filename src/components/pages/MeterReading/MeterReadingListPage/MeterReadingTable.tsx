import { Card } from '@/components/common'
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
import type { IReportUtility, Maybe } from '@/types'
import { formatNumber } from '@/utilities'

import MeterReadingModal from './MeterReadingModal'

type IMeterReadingTableProps = {
  readingDate: Maybe<string>
  filteredReadings: Maybe<Array<IReportUtility>>
  isLoading: boolean
  isSearch: boolean
  handlePageChange: (page: number) => void
  currentPage: number
  totalPages: number
  totalElements: number
}
const MeterReadingTable = ({
  readingDate,
  filteredReadings,
  isLoading,
  isSearch,
  currentPage,
  totalPages,
  totalElements,
  handlePageChange,
}: IMeterReadingTableProps) => {
  if (isLoading)
    return (
      <Card className="rounded-2xl p-6">
        <PageTableLoading bodyRows={12} />
      </Card>
    )
  if ((isSearch && !filteredReadings) || (isSearch && filteredReadings?.length === 0))
    return (
      <Card className="rounded-2xl p-6">
        <PageTableSearchEmpty message="No meter reading available" subMessage="Please try again" />
      </Card>
    )
  if (!filteredReadings || filteredReadings.length === 0)
    return (
      <Card className="rounded-2xl p-6">
        <PageTableEmpty message="No meter reading available" />
      </Card>
    )
  return (
    <div className="space-y-4">
      <div>
        <p className="text-theme-secondary text-body-2 mb-4">Reading Date: {readingDate}</p>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room</TableHead>
                <TableHead className="text-center">Building</TableHead>
                <TableHead className="text-center">Water Start</TableHead>
                <TableHead className="text-center">Water End</TableHead>
                <TableHead className="bg-theme-primary/5 text-center">Water Total</TableHead>
                <TableHead className="text-center">Electricity Start</TableHead>
                <TableHead className="text-center">Electricity End</TableHead>
                <TableHead className="bg-theme-secondary/5 text-center">Electricity Total</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReadings?.map((reading: IReportUtility, readingIdx) => (
                <TableRow key={readingIdx}>
                  <TableCell className="font-medium">{reading.roomName}</TableCell>
                  <TableCell className="text-center">{reading.buildingName}</TableCell>
                  <TableCell className="text-center">{formatNumber(reading.waterMeterStart)}</TableCell>
                  <TableCell className="text-center">{formatNumber(reading.waterMeterEnd)}</TableCell>
                  <TableCell className="bg-theme-primary/5 text-theme-primary text-center font-semibold">
                    {formatNumber(reading.waterUsage)}
                  </TableCell>
                  <TableCell className="text-center">{formatNumber(reading.electricMeterStart)}</TableCell>
                  <TableCell className="text-center">{formatNumber(reading.electricMeterEnd)}</TableCell>
                  <TableCell className="bg-theme-secondary/5 text-theme-secondary text-center font-semibold">
                    {formatNumber(reading.electricUsage)}
                  </TableCell>

                  <TableCell className="text-center">
                    <MeterReadingModal room={reading} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <PaginationBar
        totalElements={totalElements}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        page={currentPage}
      />
    </div>
  )
}

export default MeterReadingTable
