import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import type { VariantProps } from 'tailwind-variants'

import { PaginationBar } from '@/components/feature'
import {
  Badge,
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
import { NORMAL_INVOICE_TABLE_HEADER, ROUTES } from '@/constants'
import type { IInvoiceSummary, IPaginate } from '@/types'

import InvoiceAction from './NormalInvoiceAction'

type INormalInvoiceTableProps = {
  data: Array<IInvoiceSummary>
  isLoading: boolean
  currentPage: number
  isSearched: boolean
  onPageChange: (page: number) => void
} & Pick<IPaginate, 'totalPages' | 'totalElements'>

const NormalInvoiceTable = ({
  data,
  isLoading,
  currentPage,
  isSearched,
  totalPages,
  totalElements,
  onPageChange,
}: INormalInvoiceTableProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const navigate: NavigateFunction = useNavigate()
  const handleUpdateInvoice = useCallback(() => {
    toast.success('Need invoice Update Page here')
  }, [])

  const handleDeleteInvoice = useCallback(() => {
    toast.success('Need invoice Invoice Delete here')
  }, [])

  const handleDetailInvoice = useCallback(
    (adhocInvoiceId?: string) => {
      if (!apartmentId || !adhocInvoiceId) return
      navigate(ROUTES.invoiceDetail.getPath(apartmentId, adhocInvoiceId))
    },
    [apartmentId, navigate],
  )

  const maintenanceStatusBadgeVariant = useCallback((status: string): VariantProps<typeof Badge>['variant'] => {
    switch (status) {
      case 'paid':
        return 'success'
      case 'unpaid':
        return 'warning'
      case 'overdue':
        return 'error'
      default:
        return 'secondary'
    }
  }, [])

  if (isLoading) {
    return <PageTableLoading />
  }

  if (isSearched && data.length === 0) {
    return <PageTableSearchEmpty subMessage="No Invoices found" message="No Invoices found" />
  }

  if (!data || data.length === 0) {
    return <PageTableEmpty message="No Invoices found" />
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
          {data.map((item: IInvoiceSummary, index) => (
            <TableRow className="cursor-pointer" key={index} onClick={() => handleDetailInvoice(item.id)}>
              <TableCell>{item.invoiceNumber ? item.invoiceNumber : 'N/A'}</TableCell>
              <TableCell>{item.tenant ? item.tenant : 'N/A'}</TableCell>
              <TableCell>{item.room ? item.room : 'N/A'}</TableCell>
              <TableCell>{item.amount ? item.amount : 'N/A'}</TableCell>
              <TableCell>{item.issueDate ? item.issueDate : 'N/A'}</TableCell>
              <TableCell>{item.dueDate ? item.dueDate : 'N/A'}</TableCell>
              <TableCell className="capitalize">
                <Badge variant={maintenanceStatusBadgeVariant(item.status)}>{item.status}</Badge>
              </TableCell>
              <TableCell>
                <InvoiceAction id={item.id} onUpdate={handleUpdateInvoice} onDelete={handleDeleteInvoice} />
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

export default NormalInvoiceTable
