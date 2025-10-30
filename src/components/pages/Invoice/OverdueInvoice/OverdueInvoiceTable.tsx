import { useCallback } from 'react'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

import { PaginationBar } from '@/components/feature'
import {
  Badge,
  FieldEmpty,
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
import { OVERDUE_INVOICE_TABLE_HEADER, ROUTES } from '@/constants'
import { type IOverdueInvoice, type IPaginate } from '@/types'
import { formatCurrency } from '@/utilities'

type IOverdueInvoiceTableProps = {
  data: Array<IOverdueInvoice>
  isLoading: boolean
  currentPage: number
  isSearched: boolean
  onPageChange: (page: number) => void
} & Pick<IPaginate, 'totalPages' | 'totalElements'>

const OverdueInvoiceTable = ({
  data,
  isLoading,
  currentPage,
  isSearched,
  totalPages,
  totalElements,
  onPageChange,
}: IOverdueInvoiceTableProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const navigate: NavigateFunction = useNavigate()

  const handleDetailInvoice = useCallback(
    (adhocInvoiceId?: string) => {
      if (!apartmentId || !adhocInvoiceId) return
      navigate(ROUTES.invoiceDetail.getPath(apartmentId, adhocInvoiceId))
    },
    [apartmentId, navigate],
  )

  if (isLoading) {
    return <PageTableLoading />
  }

  if (isSearched && data.length === 0) {
    return <PageTableSearchEmpty subMessage="No Invoices found" message="No Invoices found for this search" />
  }

  if (!data || data.length === 0) {
    return <PageTableEmpty message="No Invoices found for this apartment" />
  }
  return (
    <div className="bg-theme-light flex flex-col gap-y-3 rounded-lg">
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
          {data?.map((item: IOverdueInvoice, index) => (
            <TableRow className="cursor-pointer" key={index} onClick={() => handleDetailInvoice(item.id)}>
              <TableCell className="text-theme-primary">
                {item.invoiceNumber ? item.invoiceNumber : <FieldEmpty />}
              </TableCell>
              <TableCell>{item.tenant ? item.tenant : <FieldEmpty />}</TableCell>
              <TableCell>{item.room ? item.room : <FieldEmpty />}</TableCell>
              <TableCell>{item.amount ? formatCurrency(item.amount) : <FieldEmpty />}</TableCell>
              <TableCell>{item.issueDate ? item.issueDate : <FieldEmpty />}</TableCell>
              <TableCell>{item.dueDate ? item.dueDate : <FieldEmpty />}</TableCell>
              <TableCell className="capitalize">
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
