import { PaginationBar } from '@/components/feature'
import type { IPaginate, ITenant } from '@/types'

import TenantCard from './TenantCard'

type ITenantSelectModalData = {
  tenantsData: Array<ITenant>
  selectedTenantId?: string
  onSelectTenant: (userId: string, name: string) => void
  isLoadingTenants: boolean
  currentPage: number
  handlePageChange: (page: number) => void
} & Pick<IPaginate, 'totalPages' | 'totalElements'>
const TenantSelectModalData = ({
  tenantsData,
  selectedTenantId,
  onSelectTenant,
  isLoadingTenants,
  currentPage,
  handlePageChange,
  totalPages,
  totalElements,
}: ITenantSelectModalData) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {tenantsData.map((tenant: ITenant) => (
          <TenantCard
            key={tenant.userId}
            tenant={tenant}
            onSelectTenant={onSelectTenant}
            selectedTenantId={selectedTenantId}
          />
        ))}
      </div>
      <PaginationBar
        onPageChange={handlePageChange}
        isLoading={isLoadingTenants}
        page={currentPage}
        totalPages={totalPages}
        totalElements={totalElements}
      />
    </div>
  )
}

export default TenantSelectModalData
