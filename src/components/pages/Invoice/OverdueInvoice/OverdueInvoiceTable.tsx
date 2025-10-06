import { PackageOpen } from 'lucide-react'
import { useCallback } from 'react'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

import { PaginationBar } from '@/components/feature'
import { Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { OVERDUE_INVOICE_TABLE_HEADER, ROUTES } from '@/constants'
import { type IOverdueInvoice, type IPaginate } from '@/types'

import OverdueInvoiceLoading from './OverdueInvoiceLoading'

type IOverdueInvoiceTableProps = {
  data: Array<IOverdueInvoice>
  isLoading: boolean
  currentPage: number
  onPageChange: (page: number) => void
} & Pick<IPaginate, 'totalPages' | 'totalElements'>

const OverdueInvoiceTable = ({
  data,
  isLoading,
  currentPage,
  totalPages,
  totalElements,
  onPageChange,
}: IOverdueInvoiceTableProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const navigate: NavigateFunction = useNavigate()

  const handleDetailInvoice = useCallback(
    (invoiceId?: string) => {
      if (!invoiceId) return
      if (!apartmentId) return navigate(ROUTES.invoiceDetail.getPath(apartmentId, invoiceId))
    },
    [apartmentId, navigate],
  )

  if (isLoading) {
    return <OverdueInvoiceLoading />
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-theme-light flex h-1/2 flex-col items-center justify-center rounded-lg p-5">
        <PackageOpen size={50} />
        <p className="text-theme-secondary text-body-1">No Invoices found</p>
      </div>
    )
  }
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
            <TableRow className="cursor-pointer" key={index} onClick={() => handleDetailInvoice(item.id)}>
              <TableCell>{item.invoiceNumber ? item.invoiceNumber : 'N/A'}</TableCell>
              <TableCell>{item.tenant ? item.tenant : 'N/A'}</TableCell>
              <TableCell>{item.room ? item.room : 'N/A'}</TableCell>
              <TableCell>{item.amount ? item.amount : 'N/A'}</TableCell>
              <TableCell>{item.issueDate ? item.issueDate : 'N/A'}</TableCell>
              <TableCell>{item.dueDate ? item.dueDate : 'N/A'}</TableCell>
              <TableCell>
                <Badge variant="error">{item.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between">
        <p className="text-theme-secondary text-body-2">
          Showing {data.length} of {totalElements} items
        </p>
        <PaginationBar
          isLoading={isLoading}
          page={currentPage}
          totalElements={totalElements}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  )
}

export default OverdueInvoiceTable
