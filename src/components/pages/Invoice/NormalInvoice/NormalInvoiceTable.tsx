import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import type { VariantProps } from 'tailwind-variants'

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
import { NORMAL_INVOICE_TABLE_HEADER, ROUTES } from '@/constants'
import type { IInvoiceSummary, IPaginate } from '@/types'
import { formatCurrency } from '@/utilities'

import InvoiceAction from './NormalInvoiceAction'
import NormalInvoiceUpdateModal from './NormalInvoiceUpdateModal'

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

  const [isUpdateModalOpen, setIsUpdateModalOpen]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(false)
  const [selectedId, setSelectedId]: [string, Dispatch<SetStateAction<string>>] = useState<string>('')

  const handleUpdateModalOpen = useCallback(() => {
    setIsUpdateModalOpen(true)
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
    return <PageTableSearchEmpty subMessage="No Invoices found" message="No Invoices found for this search" />
  }

  if (!data || data.length === 0) {
    return <PageTableEmpty message="No Invoices found for this apartment" />
  }

  return (
    <div className="space-y-4">
      <NormalInvoiceUpdateModal selectedId={selectedId} open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen} />
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
              <TableCell className="text-theme-primary">{item.invoiceNumber ? item.invoiceNumber : 'N/A'}</TableCell>
              <TableCell>{item.title ? item.title : <FieldEmpty />}</TableCell>
              <TableCell>{item.description ? item.description : <FieldEmpty />}</TableCell>
              <TableCell>{item.tenant ? item.tenant : <FieldEmpty />}</TableCell>
              <TableCell>{item.room ? item.room : <FieldEmpty />}</TableCell>
              <TableCell>{item.amount ? formatCurrency(item.amount) : <FieldEmpty />}</TableCell>
              <TableCell>{item.issueDate ? item.issueDate : <FieldEmpty />}</TableCell>
              <TableCell>{item.dueDate ? item.dueDate : <FieldEmpty />}</TableCell>
              <TableCell className="capitalize">
                <Badge variant={maintenanceStatusBadgeVariant(item.status)}>{item.status}</Badge>
              </TableCell>
              <TableCell>
                <InvoiceAction id={item.id} onUpdateModalOpen={handleUpdateModalOpen} onSelectedId={setSelectedId} />
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
