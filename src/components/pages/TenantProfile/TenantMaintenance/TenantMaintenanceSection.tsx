import { PaginationBar } from '@/components/feature'
import { EmptyPage } from '@/components/ui'
import type { IMaintenanceInfo, IPaginate } from '@/types'

import TenantMaintenanceCard from './TenantMaintenanceCard'
import TenantMaintenanceListSkeleton from './TenantMaintenanceListSkeleton'

type ITenantMaintenanceSectionProps = {
  maintenanceList: Array<IMaintenanceInfo>
  currentPage: number
  onPageChange: (page: number) => void
  isLoading: boolean
} & Pick<IPaginate, 'totalPages' | 'totalElements'>
const TenantMaintenanceSection = ({
  maintenanceList,
  currentPage,
  isLoading,
  onPageChange,
  totalPages,
  totalElements,
}: ITenantMaintenanceSectionProps) => {
  if (isLoading) return <TenantMaintenanceListSkeleton />

  if (!maintenanceList || maintenanceList.length === 0)
    return (
      <EmptyPage title="No maintenance requests found" description="You don't have any maintenance requests yet." />
    )
  return (
    <div>
      <div className="desktop:grid-cols-2 grid gap-4">
        {maintenanceList.map((maintenance: IMaintenanceInfo) => (
          <TenantMaintenanceCard key={maintenance.id} maintenance={maintenance} />
        ))}
      </div>
      <PaginationBar
        isLoading={isLoading}
        page={currentPage}
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default TenantMaintenanceSection
