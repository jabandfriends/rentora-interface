import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'
import { EmptyPage, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import type { IMaintenanceSupplyUsage } from '@/types'
import { formatCurrency, formatNumber } from '@/utilities'

type IMaintenanceSupplyUsageProps = {
  suppliesUsage: Array<IMaintenanceSupplyUsage>
}
const MaintenanceSupplyUsage = ({ suppliesUsage }: IMaintenanceSupplyUsageProps) => {
  if (!suppliesUsage || suppliesUsage.length === 0) {
    return (
      <Card className="justify-start rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle>Supply Usage</CardTitle>
          <CardDescription>The supplies used for this maintenance.</CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyPage title="No Supply Usage Found" description="No supply usage found for this maintenance." />
        </CardContent>
      </Card>
    )
  }
  return (
    <Card className="justify-start rounded-xl shadow-sm">
      <CardHeader>
        <CardTitle>Supply Usage</CardTitle>
        <CardDescription>The supplies used for this maintenance.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Supply Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliesUsage.map((supply: IMaintenanceSupplyUsage) => (
              <TableRow key={supply.supplyId}>
                <TableCell className="flex flex-col">
                  {supply.supplyName}
                  {supply.supplyDescription && (
                    <span className="text-theme-secondary text-body-3">{supply.supplyDescription}</span>
                  )}
                </TableCell>
                <TableCell className="capitalize">{supply.supplyCategory}</TableCell>
                <TableCell>
                  {formatNumber(supply.supplyUsedQuantity)} {supply.supplyUnit}
                </TableCell>
                <TableCell>{formatCurrency(supply.supplyUsedQuantity * supply.supplyUnitPrice)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default MaintenanceSupplyUsage
