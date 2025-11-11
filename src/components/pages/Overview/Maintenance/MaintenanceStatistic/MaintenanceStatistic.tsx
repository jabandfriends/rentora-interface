import { useParams } from 'react-router-dom'

import { EmptyPage, PageTableLoading, Table, TableHead, TableHeader, TableRow } from '@/components/ui'
import { MAINTENANCE_ANALYTIC_STATISTICS_TABLE_HEADERS } from '@/constants'
import { useRentoraApiMaintenanceAnalyticYearlyStats } from '@/hooks'

import MaintenanceStatisticTableBody from './MaintenanceStatisticTableBody'

const MaintenanceStatistic = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { data: stats, isLoading: isLoadingStats } = useRentoraApiMaintenanceAnalyticYearlyStats({
    apartmentId: apartmentId!,
  })

  if (isLoadingStats) return <PageTableLoading bodyRows={5} />
  if (!stats || stats.length === 0)
    return (
      <EmptyPage
        title="No maintenance statistics yet!"
        description="It looks like there aren't any maintenance records to display for this apartment."
      />
    )

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {MAINTENANCE_ANALYTIC_STATISTICS_TABLE_HEADERS.map((header: string) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <MaintenanceStatisticTableBody maintenanceStats={stats} />
    </Table>
  )
}

export default MaintenanceStatistic
