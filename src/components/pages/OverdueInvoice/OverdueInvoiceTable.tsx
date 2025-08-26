import { Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { OVERDUE_INVOICE_TABLE_HEADER } from '@/constants'

//RECHECK : API TYPE
const OverdueInvoiceTable = ({ data }: { data: Array<any> }) => {
  return (
    <div className="bg-theme-light flex flex-col gap-y-3 rounded-lg p-5">
      <Table>
        <TableHeader>
          <TableRow>
            {OVERDUE_INVOICE_TABLE_HEADER.map((header: string) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* RECHECK : API TYPE */}
          {data?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.invoice}</TableCell>
              <TableCell>{item.tenant}</TableCell>
              <TableCell>{item.room}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>{item.issueDate}</TableCell>
              <TableCell>{item.dueDate}</TableCell>
              <TableCell>
                <Badge variant="success">{item.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default OverdueInvoiceTable
