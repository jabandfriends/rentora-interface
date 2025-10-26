import { useDebounce } from '@uidotdev/usehooks'
import { Box, DollarSign, Eye, PackageOpen, Plus } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/common'
import { PageTableBody, PageTableHeader, PageTableSearch } from '@/components/ui'
import { DEFAULT_SUPPLY_LIST_DATA, ROUTES } from '@/constants'
import { SupplyCategory } from '@/enum'
import { useRentoraApiSupplyList } from '@/hooks'
import type { IPaginationBarProps, ISearchBarProps, IStatsCardProps, Maybe } from '@/types'
import { formatCurrency, formatNumber } from '@/utilities'

import SupplyCreateModal from './SupplyCreateModal'
import SupplyTable from './SupplyTable'

const SupplyBody = () => {
  const navigate: NavigateFunction = useNavigate()
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
    metadata: { totalSupplies, totalLowStockSupplies, totalCostSupplies },
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

  const navigateToSupplyTransactions = useCallback(() => {
    navigate(ROUTES.supplyTransactions.getPath(apartmentId))
  }, [navigate, apartmentId])

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

  const supplyStats: Array<IStatsCardProps> = useMemo(() => {
    return [
      {
        title: 'Total Supplies',
        count: formatNumber(totalSupplies),
        icon: <Box size={18} />,
        type: 'primary',
      },
      {
        title: 'Total Low Stock Supplies',
        count: formatNumber(totalLowStockSupplies),
        icon: <PackageOpen size={18} />,
        type: 'warning',
      },
      {
        title: 'Total Cost of Supplies',
        count: formatCurrency(totalCostSupplies),
        icon: <DollarSign size={18} />,
        type: 'success',
      },
    ]
  }, [totalSupplies, totalLowStockSupplies, totalCostSupplies])
  return (
    <>
      <SupplyCreateModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />

      <PageTableBody className="space-y-4">
        <div className="flex flex-col gap-y-4">
          <PageTableHeader
            title="Supplies Management"
            description="Easily manage and track all your supplies here!"
            stats={supplyStats}
            isLoading={isSuppliesLoading}
            actionButton={
              <div className="flex items-center gap-2">
                <Button className="flex w-auto items-center gap-2" onClick={openCreateModal}>
                  <Plus size={18} /> New Supply
                </Button>
                <Button
                  variant="secondary"
                  className="flex w-auto items-center gap-2"
                  onClick={navigateToSupplyTransactions}
                >
                  <Eye size={18} /> Transactions
                </Button>
              </div>
            }
          />
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
