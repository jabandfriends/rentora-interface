import { SquarePen } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import { Badge, PaginationBar, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { NORMAL_INVOICE_TABLE_HEADER, ROUTES } from '@/constants'

//RECHECK : api type
type INormalInvoiceTableProps = {
  data: Array<any>
}
//RECHECK : API TYPE
const NormalInvoiceTable = ({ data }: INormalInvoiceTableProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const navigate = useNavigate()
  const handleRowClick = (invoiceId: string) => {
    navigate(ROUTES.invoiceDetail.getPath(apartmentId, invoiceId))
  }
  return (
    <div className="bg-theme-light flex flex-col gap-y-3 rounded-lg p-5">
      <Table>
        <TableHeader>
          <TableRow>
            {NORMAL_INVOICE_TABLE_HEADER.map((header: string) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* RECHECK : API TYPE */}
          {data.map((item, index) => (
            <TableRow className="cursor-pointer" onClick={() => handleRowClick(index.toString())} key={index}>
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
              <TableCell>
                <SquarePen size={20} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationBar />
    </div>
  )
}

export default NormalInvoiceTable
