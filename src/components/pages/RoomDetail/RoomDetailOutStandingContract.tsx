import { Card } from '@/components/common'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'

const RoomDetailOutStandingContract = () => {
  return (
    <Card className="rounded-2xl shadow-lg hover:shadow-xl">
      <div className="border-theme-secondary-400 border-b pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3>Outstanding Contracts</h3>
            <p className="text-body-2 text-theme-secondary-600">Track pending contract transitions</p>
          </div>
        </div>
      </div>
      <Table className="pt-6">
        <TableHeader className="p-4">
          <TableRow>
            <TableHead>Move-in/out Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Customer</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>A</TableCell>
            <TableCell>B</TableCell>
            <TableCell>C</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>B</TableCell>
            <TableCell>B</TableCell>
            <TableCell>B</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  )
}

export default RoomDetailOutStandingContract
