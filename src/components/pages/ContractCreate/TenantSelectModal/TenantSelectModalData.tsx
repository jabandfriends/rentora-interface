import { Search } from 'lucide-react'

import { Spinner } from '@/components/common'
import { PaginationBar } from '@/components/feature'
import { EmptyPage, PageTableEmpty } from '@/components/ui'
import type { IPaginate, ITenant } from '@/types'

import TenantCard from './TenantCard'

type ITenantSelectModalData = {
  tenantsData: Array<ITenant>
  selectedTenantId?: string
  onSelectTenant: (userId: string, name: string) => void
  isLoadingTenants: boolean
  currentPage: number
  handlePageChange: (page: number) => void
  isSearched: boolean
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
  isSearched,
}: ITenantSelectModalData) => {
  if (isLoadingTenants) {
    return (
      <PageTableEmpty icon={<Spinner />} message="Loading..." description="Please wait while we load the tenants." />
    )
  }
  if (isSearched && !isLoadingTenants && tenantsData.length === 0) {
    return (
      <EmptyPage
        icon={<Search />}
        title="No tenants found"
        description="Please try again later or check your filters."
      />
    )
  }
  if (!tenantsData || tenantsData.length === 0) {
    return <EmptyPage title="No tenants found" description="Please try again later or check your filters." />
  }
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
