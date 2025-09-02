import { PaginationBar, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { ELECTRIC_WATER_REPORT_TABLE_HEADER } from '@/constants'

type IElectricWaterReportTableProps = {
  data: Array<any>
}

const ElectricWaterReportTable = ({ data }: IElectricWaterReportTableProps) => {
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
          {/* RECHECK : API TYPE */}
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.room}</TableCell>
              <TableCell>{item.tenant}</TableCell>
              <TableCell>{item.electricUsage}</TableCell>
              <TableCell>{item.electricBills}</TableCell>
              <TableCell>{item.waterUsage}</TableCell>
              <TableCell>{item.waterBills}</TableCell>
              <TableCell>{item.totalBills}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationBar />
    </div>
  )
}

export default ElectricWaterReportTable
