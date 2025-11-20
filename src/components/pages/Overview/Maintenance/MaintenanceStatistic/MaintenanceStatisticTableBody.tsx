import { TableBody, TableCell, TableRow } from '@/components/ui'
import type { IMaintenanceYearlyStatistics } from '@/types'
import { formatCurrency, formatNumber } from '@/utilities'

type IMaintenanceStatisticTableBodyProps = {
  maintenanceStats: Array<IMaintenanceYearlyStatistics>
}
const MaintenanceStatisticTableBody = ({ maintenanceStats }: IMaintenanceStatisticTableBodyProps) => {
  return (
    <TableBody>
      {maintenanceStats.map((maintenanceStat: IMaintenanceYearlyStatistics) => (
        <TableRow key={maintenanceStat.year}>
          <TableCell className="text-theme-primary">{maintenanceStat.year}</TableCell>
          <TableCell>{formatNumber(maintenanceStat.totalRequests)} tasks</TableCell>
          <TableCell>{formatCurrency(maintenanceStat.totalCost)}</TableCell>
          <TableCell className="text-theme-success">{formatNumber(maintenanceStat.completed)} tasks</TableCell>
          <TableCell className="text-theme-warning">{formatNumber(maintenanceStat.pending)} tasks</TableCell>
          <TableCell>{formatCurrency(maintenanceStat.avgCost)}</TableCell>
          <TableCell>{formatNumber(maintenanceStat.completionRate, 2)}%</TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

export default MaintenanceStatisticTableBody
