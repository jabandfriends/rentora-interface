import { useCallback } from 'react'
import type { VariantProps } from 'tailwind-variants'

import { Checkbox } from '@/components/common'
import { PaginationBar, ScrollArea, SearchBar } from '@/components/feature'
import { Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { SupplyStockStatus } from '@/enum'
import type { ISearchBarProps, ISuppliesUsage, ISupply } from '@/types'

type ISupplySelectStepProps = {
  supplies: Array<ISupply>
  selectedSupplies: Array<ISuppliesUsage>
  onSearchChange: ISearchBarProps['onChange']
  onSelectSupply: (supply: ISupply, checked: boolean) => void
  onPageChange: (page: number) => void
  totalPages: number
  currentPage: number
  totalElements: number
}
const SupplySelectStep = ({
  supplies,
  selectedSupplies,
  onSearchChange,
  onSelectSupply,
  onPageChange,
  totalPages,
  currentPage,
  totalElements,
}: ISupplySelectStepProps) => {
  const isCheckboxDisabled = useCallback((supply: ISupply) => {
    return supply.supplyStockStatus === SupplyStockStatus.OUT_OF_STOCK
  }, [])
  const supplyCategory = useCallback((supply: ISupply) => {
    return supply.supplyCategory.replace('_', ' ')
  }, [])
  const getStockStatusBadgeVariant = useCallback((supply: ISupply): VariantProps<typeof Badge>['variant'] => {
    switch (supply.supplyStockStatus) {
      case SupplyStockStatus.IN_STOCK:
        return 'success'
      case SupplyStockStatus.LOW_STOCK:
        return 'warning'
      case SupplyStockStatus.OUT_OF_STOCK:
        return 'error'
    }
  }, [])

  const getSupplyStatusText = useCallback((stockStatus: SupplyStockStatus): string => {
    switch (stockStatus) {
      case SupplyStockStatus.IN_STOCK:
        return 'In Stock'
      case SupplyStockStatus.LOW_STOCK:
        return 'Low Stock'
      case SupplyStockStatus.OUT_OF_STOCK:
        return 'Out of Stock'
    }
  }, [])
  return (
    <>
      <div className="relative mb-4">
        <SearchBar onChange={onSearchChange} placeholder="Search supplies..." />
      </div>

      <ScrollArea className="-mx-6 flex-1 px-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12" />
              <TableHead>Supply Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Available</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {supplies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-theme-secondary py-8 text-center">
                  No supplies found
                </TableCell>
              </TableRow>
            ) : (
              supplies.map((supply: ISupply) => (
                <TableRow key={supply.supplyId}>
                  <TableCell>
                    <Checkbox
                      checked={selectedSupplies.some((s) => s.supplyId === supply.supplyId)}
                      onCheckedChange={(checked) => onSelectSupply(supply, checked as boolean)}
                      disabled={isCheckboxDisabled(supply)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {supply.supplyName}
                    {supply.supplyDescription && (
                      <div className="text-theme-secondary text-body-2 font-normal">{supply.supplyDescription}</div>
                    )}
                  </TableCell>
                  <TableCell className="capitalize">{supplyCategory(supply)}</TableCell>
                  <TableCell>
                    {supply.supplyQuantity} {supply.supplyUnit}
                  </TableCell>
                  <TableCell>${supply.supplyUnitPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={getStockStatusBadgeVariant(supply)}>
                      {getSupplyStatusText(supply.supplyStockStatus)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>
      <PaginationBar
        totalPages={totalPages}
        page={currentPage}
        onPageChange={onPageChange}
        totalElements={totalElements}
      />
    </>
  )
}

export default SupplySelectStep
