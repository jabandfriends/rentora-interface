import { AlertCircle, Ellipsis } from 'lucide-react'
import { useCallback } from 'react'
import type { VariantProps } from 'tailwind-variants'

import { Button } from '@/components/common'
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
import { SupplyStockStatus } from '@/enum'
import type { IPaginate, ISupply } from '@/types'
import { formatCurrency, formatNumber } from '@/utilities'

type ISupplyTableProps = {
  data: Array<ISupply>
  isLoading: boolean
  isSearched: boolean
  currentPage: number
  isError: boolean
  onPageChange: (page: number) => void
} & Pick<IPaginate, 'totalPages' | 'totalElements'>

const SupplyTable = ({
  data,
  isLoading,
  isSearched,
  currentPage,
  totalPages,
  totalElements,
  isError,
  onPageChange,
}: ISupplyTableProps) => {
  const stockStatusBadgeVariant = useCallback(
    (stockStatus: SupplyStockStatus): VariantProps<typeof Badge>['variant'] => {
      switch (stockStatus) {
        case SupplyStockStatus.LOW_STOCK:
          return 'warning'
        case SupplyStockStatus.IN_STOCK:
          return 'success'
        case SupplyStockStatus.OUT_OF_STOCK:
          return 'error'
        default:
          return 'default'
      }
    },
    [],
  )

  const supplyText = useCallback((stockStatus: SupplyStockStatus): string => {
    switch (stockStatus) {
      case SupplyStockStatus.LOW_STOCK:
        return 'Low Stock'
      case SupplyStockStatus.IN_STOCK:
        return 'In Stock'
      case SupplyStockStatus.OUT_OF_STOCK:
        return 'Out of Stock'
      default:
        return 'Unknown'
    }
  }, [])
  if (isLoading) {
    return <PageTableLoading />
  }
  if (isError) {
    return (
      <PageTableEmpty
        icon={<AlertCircle size={50} />}
        message="Oops! Something went wrong"
        description="We couldn't get your supplies. Please try again or let us know if this keeps happening!"
      />
    )
  }
  if (isSearched && (!data || data.length === 0)) {
    return (
      <PageTableSearchEmpty
        message="No supplies match your search."
        subMessage="Try adjusting your keywords or filters!"
      />
    )
  }
  if (!data || data.length === 0) {
    return <PageTableEmpty message="No supplies found. Start by adding your first supply!" />
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Total Value</TableHead>
            <TableHead>Stock Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.supplyId}>
              <TableCell className="capitalize">{item.supplyName}</TableCell>
              <TableCell className="capitalize">{item.supplyCategory}</TableCell>
              <TableCell>
                {formatNumber(item.supplyQuantity)} {item.supplyUnit}
              </TableCell>
              <TableCell>{formatCurrency(item.supplyUnitPrice)}</TableCell>
              <TableCell>{formatCurrency(item.supplyTotalCost)}</TableCell>
              <TableCell>
                <Badge className="capitalize" variant={stockStatusBadgeVariant(item.supplyStockStatus)}>
                  {supplyText(item.supplyStockStatus)}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="vanilla">
                  <Ellipsis />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationBar
        isLoading={isLoading}
        page={currentPage}
        totalElements={totalElements}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  )
}

export default SupplyTable
