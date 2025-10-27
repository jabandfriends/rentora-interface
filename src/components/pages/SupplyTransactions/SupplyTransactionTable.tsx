import { AlertCircle, CircleArrowDown, CircleArrowUp, Settings } from 'lucide-react'
import { type ReactNode, useCallback } from 'react'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import type { VariantProps } from 'tailwind-variants'

import { PaginationBar } from '@/components/feature'
import {
  Badge,
  FieldEmpty,
  PageTableEmpty,
  PageTableLoading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { ROUTES, SUPPLY_TRANSACTION_TABLE_HEADERS } from '@/constants'
import { SupplyTransactionType } from '@/enum'
import type { IPaginate, ISupplyTransaction } from '@/types'
import { formatTimestamp } from '@/utilities'

type ISupplyTransactionTableProps = {
  data: Array<ISupplyTransaction>
  isLoading: boolean
  isError: boolean
  currentPage: number
  onPageChange: (page: number) => void
} & Pick<IPaginate, 'totalPages' | 'totalElements'>
const SupplyTransactionTable = ({
  data,
  isLoading,
  isError,
  totalPages,
  totalElements,
  currentPage,
  onPageChange,
}: ISupplyTransactionTableProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const navigate: NavigateFunction = useNavigate()
  const supplyTransactionTypeBadgeVariantWithIcon = useCallback(
    (status: SupplyTransactionType): { icon: ReactNode; variant: VariantProps<typeof Badge>['variant'] } => {
      switch (status) {
        case SupplyTransactionType.PURCHASE:
          return { icon: <CircleArrowUp size={18} />, variant: 'secondary' }
        case SupplyTransactionType.USE:
          return { icon: <CircleArrowDown size={18} />, variant: 'outline' }
        case SupplyTransactionType.ADJUSTMENT:
          return { icon: <Settings size={18} />, variant: 'outline' }
      }
    },
    [],
  )
  const handleNavigateMaintenanceDetail = useCallback(
    (id: string) => {
      if (!apartmentId || !id) return
      navigate(ROUTES.maintenanceDetail.getPath(apartmentId, id))
    },
    [apartmentId, navigate],
  )
  if (isLoading) {
    return <PageTableLoading />
  }
  if (isError) {
    return (
      <PageTableEmpty
        icon={<AlertCircle size={50} />}
        message="Oops! Something went wrong"
        description="We couldn't get your supply transactions. Please try again or let us know if this keeps happening!"
      />
    )
  }

  if (!data || data.length === 0) {
    return <PageTableEmpty message="No supply transactions found" />
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            {SUPPLY_TRANSACTION_TABLE_HEADERS.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((transaction: ISupplyTransaction) => {
            const { icon, variant } = supplyTransactionTypeBadgeVariantWithIcon(transaction.supplyTransactionType)
            return (
              <TableRow key={transaction.transactionDate + transaction.supplyName}>
                <TableCell
                  className="text-theme-primary cursor-pointer hover:underline"
                  onClick={() => handleNavigateMaintenanceDetail(transaction.maintenanceId)}
                >
                  {transaction.maintenanceNumber || <FieldEmpty />}
                </TableCell>
                <TableCell className="text-theme-secondary">
                  {formatTimestamp(transaction.transactionDate, 'MMM D, YYYY HH:mm:ss')}
                </TableCell>
                <TableCell>{transaction.supplyName}</TableCell>
                <TableCell>
                  <Badge className="gap-x-2" variant={variant}>
                    {icon}
                    <span className="font-semibold capitalize">{transaction.supplyTransactionType}</span>
                  </Badge>
                </TableCell>
                <TableCell>{transaction.quantity}</TableCell>
                <TableCell className="text-theme-secondary">{transaction.note || <FieldEmpty />}</TableCell>
                <TableCell className="text-theme-primary">{transaction.changeByUser}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <PaginationBar
        isLoading={isLoading}
        page={currentPage}
        totalElements={totalElements}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default SupplyTransactionTable
