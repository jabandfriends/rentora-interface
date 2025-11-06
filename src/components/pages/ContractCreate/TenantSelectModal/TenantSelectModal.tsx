import { useDebounce } from '@uidotdev/usehooks'
import {
  type ChangeEvent,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useCallback,
  useState,
} from 'react'
import { useForm } from 'react-hook-form'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/common'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, SearchBar } from '@/components/feature'
import { DEFAULT_TENANT_LIST_DATA, ROUTES } from '@/constants'
import { useRentoraApiTenantList } from '@/hooks'

import TenantSelectModalData from './TenantSelectModalData'

type ITenantSelectModal = PropsWithChildren<{
  selectedTenantId?: string
  onSelectTenant: (userId: string, name: string) => void
  onOpenChange: (open: boolean) => void
  isOpen: boolean
}>
const TenantSelectModal = ({ selectedTenantId, onSelectTenant, onOpenChange, isOpen }: ITenantSelectModal) => {
  const navigate: NavigateFunction = useNavigate()
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState(
    DEFAULT_TENANT_LIST_DATA.page,
  )

  const { watch, setValue } = useForm({
    defaultValues: {
      search: '',
    },
  })

  const [search]: [string] = watch(['search'])

  const debouncedSearch = useDebounce(search ? search : undefined, 500)
  const {
    data: tenantsData,
    isLoading: isLoadingTenants,
    pagination: { totalPages, totalElements },
  } = useRentoraApiTenantList({
    apartmentId: apartmentId,
    params: {
      page: currentPage,
      size: DEFAULT_TENANT_LIST_DATA.size,
      name: debouncedSearch,
    },
  })
  const handleSearchTenant = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setValue('search', value)
      setCurrentPage(DEFAULT_TENANT_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )
  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1) return
      setCurrentPage(page)
    },
    [setCurrentPage],
  )

  //navigate to new tenant page
  const handleNewTenant = useCallback(() => {
    navigate(ROUTES.tenantCreate.getPath(apartmentId))
  }, [navigate, apartmentId])
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Tenant</DialogTitle>
          <DialogDescription>Select a tenant from the list below</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-x-2">
          <SearchBar onChange={handleSearchTenant} />
          <Button variant="outline" onClick={handleNewTenant}>
            New Tenant
          </Button>
        </div>

        <TenantSelectModalData
          tenantsData={tenantsData}
          selectedTenantId={selectedTenantId}
          onSelectTenant={onSelectTenant}
          isLoadingTenants={isLoadingTenants}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          totalPages={totalPages}
          totalElements={totalElements}
        />
      </DialogContent>
    </Dialog>
  )
}

export default TenantSelectModal
