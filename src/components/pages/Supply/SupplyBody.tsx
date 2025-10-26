import { useDebounce } from '@uidotdev/usehooks'
import { Plus } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/common'
import { PageTableBody, PageTableHeader, PageTableSearch } from '@/components/ui'
import { DEFAULT_SUPPLY_LIST_DATA } from '@/constants'
import { SupplyCategory } from '@/enum'
import { useRentoraApiSupplyList } from '@/hooks'
import type { IPaginationBarProps, ISearchBarProps, Maybe } from '@/types'

import SupplyCreateModal from './SupplyCreateModal'
import SupplyTable from './SupplyTable'

const SupplyBody = () => {
  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState<number>(
    DEFAULT_SUPPLY_LIST_DATA.page,
  )
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const [isCreateModalOpen, setIsCreateModalOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)

  const { watch, setValue } = useForm({
    defaultValues: {
      search: '',
      category: undefined as Maybe<SupplyCategory>,
    },
  })

  const [search, category]: [string, Maybe<SupplyCategory>] = watch(['search', 'category'])

  const debouncedSearch = useDebounce(search ? search : undefined, 500)
  const {
    data: supplies,
    pagination: { totalPages, totalElements },
    isLoading: isSuppliesLoading,
    isError: isSuppliesError,
  } = useRentoraApiSupplyList({
    apartmentId: apartmentId,
    params: {
      page: currentPage,
      size: DEFAULT_SUPPLY_LIST_DATA.size,
      search: debouncedSearch,
      category: category,
    },
  })

  const openCreateModal = useCallback(() => {
    setIsCreateModalOpen(true)
  }, [])

  const handleSearchChange: ISearchBarProps['onChange'] = useCallback(
    ({ target: { value } }: Parameters<ISearchBarProps['onChange']>[0]) => {
      setValue('search', value)
      setCurrentPage(DEFAULT_SUPPLY_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const handlePageChange: IPaginationBarProps['onPageChange'] = useCallback(
    (page: number) => {
      if (page < 1) return
      setCurrentPage(page)
    },
    [setCurrentPage],
  )

  const handleCategoryChange = useCallback(
    (value: SupplyCategory) => {
      setValue('category', value)
      setCurrentPage(DEFAULT_SUPPLY_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const isSearched: boolean = useMemo(() => {
    return !!debouncedSearch || !!category
  }, [debouncedSearch, category])

  return (
    <>
      <SupplyCreateModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
      <PageTableHeader
        title="Supplies Management"
        description="Easily manage and track all your supplies here!"
        actionButton={
          <Button className="flex items-center gap-2" onClick={openCreateModal}>
            <Plus size={18} /> Add Supply
          </Button>
        }
      />

      <PageTableBody className="space-y-4">
        <div className="flex flex-col gap-y-4">
          <div>
            <h3 className="font-medium">Supplies Inventory</h3>
            <p className="text-theme-secondary text-body2">
              This is your inventory. You can view, update, delete, and create supplies here.
            </p>
          </div>
          <PageTableSearch
            placeholder="Search by supply name"
            statusEnum={SupplyCategory}
            onStatusChange={handleCategoryChange}
            onSearchChange={handleSearchChange}
          />
        </div>

        <SupplyTable
          data={supplies}
          isLoading={isSuppliesLoading}
          isSearched={isSearched}
          currentPage={currentPage}
          totalPages={totalPages}
          totalElements={totalElements}
          onPageChange={handlePageChange}
          isError={isSuppliesError}
        />
      </PageTableBody>
    </>
  )
}

export default SupplyBody
