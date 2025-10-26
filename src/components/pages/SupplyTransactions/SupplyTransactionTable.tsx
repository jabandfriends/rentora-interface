import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'

const SupplyTransactionTable = () => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Supply</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Note</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-theme-secondary">2024-06-05</TableCell>
            <TableCell>Toilet Paper</TableCell>
            <TableCell>Import</TableCell>
            <TableCell>50</TableCell>
            <TableCell>Restocked main supply</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default SupplyTransactionTable
