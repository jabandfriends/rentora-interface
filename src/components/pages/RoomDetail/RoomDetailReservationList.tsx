import { Plus } from 'lucide-react'

import { Button, Card } from '@/components/common'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'

const RoomDetailReservationList = () => {
  return (
    <Card className="justify-start rounded-2xl shadow-lg hover:shadow-xl">
      <div className="border-theme-secondary-400 border-b pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3>Reservation List</h3>
            <p className="text-body-2 text-theme-secondary-600">Add and manage room reservations</p>
          </div>
          <Button className="flex items-center">
            <Plus className="h-4 w-4" />
            Add Reservation
          </Button>
        </div>
      </div>

      <Table className="pt-6">
        <TableHeader className="p-4">
          <TableRow>
            <TableHead>Number / Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Check-in Date</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Deposit</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>A</TableCell>
            <TableCell>B</TableCell>
            <TableCell>C</TableCell>
            <TableCell>D</TableCell>
            <TableCell>E</TableCell>
            <TableCell>F</TableCell>
            <TableCell>G</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>B</TableCell>
            <TableCell>B</TableCell>
            <TableCell>B</TableCell>
            <TableCell>B</TableCell>
            <TableCell>B</TableCell>
            <TableCell>B</TableCell>
            <TableCell>B</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  )
}

export default RoomDetailReservationList
