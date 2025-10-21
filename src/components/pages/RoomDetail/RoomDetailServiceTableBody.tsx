import { Trash2 } from 'lucide-react'
import { useCallback, useMemo } from 'react'

import { Button, Spinner } from '@/components/common'
import { PageTableEmpty, TableBody, TableCell, TableRow } from '@/components/ui'
import type { IUnitService, Maybe } from '@/types'
import { formatCurrency } from '@/utilities'

type IRoomDetailServiceTableBodyProps = {
  unitServices: Maybe<Array<IUnitService>>
  isLoading: boolean
}
const RoomDetailServiceTableBody = ({ unitServices, isLoading }: IRoomDetailServiceTableBodyProps) => {
  const totalCostUnitService: number = useMemo(
    () => (unitServices ? unitServices.reduce((sum, s) => sum + s.price, 0) : 0),
    [unitServices],
  )
  const totalCostUnitServiceText: string = useMemo(() => formatCurrency(totalCostUnitService), [totalCostUnitService])
  const unitServicePrice = useCallback((price: Maybe<number>): string => (price ? formatCurrency(price) : '0'), [])

  //handle loading and no data
  if (isLoading)
    return (
      <TableBody>
        <TableRow aria-colspan={3}>
          <TableCell colSpan={3}>
            <PageTableEmpty
              message="Loading..."
              icon={<Spinner />}
              description="Please wait while we load your data."
            />
          </TableCell>
        </TableRow>
      </TableBody>
    )
  if (!unitServices || unitServices.length === 0)
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={3}>
            <PageTableEmpty message="No services found" description="Please add a service to this units." />
          </TableCell>
        </TableRow>
      </TableBody>
    )

  return (
    <TableBody>
      {unitServices.map((unitServices: IUnitService) => (
        <TableRow key={unitServices.id}>
          <TableCell>{unitServices.serviceName}</TableCell>
          <TableCell className="font-semibold">{unitServicePrice(unitServices.price)}</TableCell>
          <TableCell className="flex w-12 justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-theme-error-800 hover:bg-theme-error/10 hover:text-theme-error flex items-center"
            >
              <Trash2 className="size-4" />
            </Button>
          </TableCell>
        </TableRow>
      ))}
      <TableRow className="border-border border-t p-4">
        <TableCell className="font-semibold">Total</TableCell>
        <TableCell />
        <TableCell className="text-theme-primary font-bold">{totalCostUnitServiceText}</TableCell>
      </TableRow>
    </TableBody>
  )
}

export default RoomDetailServiceTableBody
