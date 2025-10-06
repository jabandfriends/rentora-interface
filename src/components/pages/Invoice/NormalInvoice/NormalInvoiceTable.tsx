import { PackageOpen } from 'lucide-react'
import { useCallback } from 'react'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

import { PaginationBar } from '@/components/feature'
import { Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { NORMAL_INVOICE_TABLE_HEADER, ROUTES } from '@/constants'
import type { IInvoiceSummary, IPaginate } from '@/types'

import InvoiceAction from './NormalInvoiceAction'
import NormalInvoiceLoading from './NormalInvoiceLoading'

type INormalInvoiceTableProps = {
  data: Array<IInvoiceSummary>
  isLoading: boolean
  currentPage: number
  onPageChange: (page: number) => void
} & Pick<IPaginate, 'totalPages' | 'totalElements'>

const NormalInvoiceTable = ({
  data,
  isLoading,
  currentPage,
  totalPages,
  totalElements,
  onPageChange,
}: INormalInvoiceTableProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const navigate: NavigateFunction = useNavigate()
  const handleUpdateInvoice = useCallback(
    (adhocInvoiceId: string) => {
      if (!adhocInvoiceId) return navigate(ROUTES.tenantUpdate.getPath(apartmentId, adhocInvoiceId))
    },
    [apartmentId, navigate],
  )

  const handleDeleteInvoice = useCallback(
    (adhocInvoiceId: string) => {
      if (!adhocInvoiceId) return navigate(ROUTES.tenantUpdatePassword.getPath(apartmentId, adhocInvoiceId))
    },
    [apartmentId, navigate],
  )

  const handleDetailInvoice = useCallback(
    (adhocInvoiceId?: string) => {
      if (!apartmentId || !adhocInvoiceId) return
      navigate(ROUTES.invoiceDetail.getPath(apartmentId, adhocInvoiceId))
    },
    [apartmentId, navigate],
  )

  if (isLoading) {
    return <NormalInvoiceLoading />
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
            {NORMAL_INVOICE_TABLE_HEADER.map((header: string) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* RECHECK : API TYPE */}
          {data.map((item, index) => (
            <TableRow className="cursor-pointer" key={index} onClick={() => handleDetailInvoice(item.adhocInvoiceId)}>
              <TableCell>{item.invoiceNumber ? item.invoiceNumber : 'N/A'}</TableCell>
              <TableCell>{item.tenant ? item.tenant : 'N/A'}</TableCell>
              <TableCell>{item.room ? item.room : 'N/A'}</TableCell>
              <TableCell>{item.amount ? item.amount : 'N/A'}</TableCell>
              <TableCell>{item.issueDate ? item.issueDate : 'N/A'}</TableCell>
              <TableCell>{item.dueDate ? item.dueDate : 'N/A'}</TableCell>
              <TableCell>
                <TableCell>
                  {item.status === 'paid' ? (
                    <Badge variant="success">paid</Badge>
                  ) : item.status === 'unpaid' || item.status === 'partially_paid' ? (
                    <Badge variant="warning">unpaid</Badge>
                  ) : item.status === 'overdue' ? (
                    <Badge variant="error">overdue</Badge>
                  ) : (
                    <Badge variant="secondary">{item.status}</Badge>
                  )}
                </TableCell>
              </TableCell>
              <TableCell>
                <InvoiceAction
                  userId={item.adhocInvoiceId}
                  onUpdate={handleUpdateInvoice}
                  onDelete={handleDeleteInvoice}
                />
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
