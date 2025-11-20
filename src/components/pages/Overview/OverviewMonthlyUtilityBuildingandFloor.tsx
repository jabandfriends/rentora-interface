import { useDebounce } from '@uidotdev/usehooks'
import { ChartColumnBig } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'
import { PaginationBar, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/feature'
import { PageTableEmpty, PageTableSearchEmpty } from '@/components/ui'
import { DEFAULT_MONTHLY_UTILITY_BUILDING_LIST_DATA } from '@/constants'
import { useRentoraApiMonthlyUtilityBuildings } from '@/hooks'
import type { ISearchBarProps } from '@/types'

import OverviewMonthlyBuilding from './OverviewMonthlyBuilding'
import { MonthlyUtilitySelectFloor } from './OverviewMonthlyUtilityFloor'

const OverviewMonthlyUtilityBuilding = () => {
  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState(
    DEFAULT_MONTHLY_UTILITY_BUILDING_LIST_DATA.page,
  )

  const { watch, setValue } = useForm({
    defaultValues: {
      search: '',
    },
  })

  const [search]: [string] = watch(['search'])

  const debouncedSearch = useDebounce(search ? search : undefined, 500)

  const { apartmentId } = useParams<{ apartmentId: string }>()

  const {
    data: monthlyUtiltyBuilding,
    isLoading,
    metadata: { totalUtilityBuildings },
  } = useRentoraApiMonthlyUtilityBuildings({
    apartmentId: apartmentId!,
    params: {
      page: currentPage,
      size: DEFAULT_MONTHLY_UTILITY_BUILDING_LIST_DATA.size,
      search: debouncedSearch,
    },
  })

  const handleSearchChange: ISearchBarProps['onChange'] = useCallback(
    ({ target: { value } }: Parameters<ISearchBarProps['onChange']>[0]) => {
      setValue('search', value)
      setCurrentPage(DEFAULT_MONTHLY_UTILITY_BUILDING_LIST_DATA.page)
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

  const isSearched: boolean = useMemo(() => !!debouncedSearch, [debouncedSearch])

  if (isSearched && monthlyUtiltyBuilding?.length === 0) {
    return <PageTableSearchEmpty message="No Building Utility" subMessage="No Building Utility found for this search" />
  }

  if (!monthlyUtiltyBuilding || monthlyUtiltyBuilding.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChartColumnBig className="h-5 w-5" />
            Building Utility
          </CardTitle>
        </CardHeader>
        <PageTableEmpty message="No Building Utility found" />
      </Card>
    )
  }

  return (
    <Card className="justify-start rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChartColumnBig className="size-5" />
          Building and Floor Utility
        </CardTitle>
        <CardDescription>Building Utility Summary</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="building">
          <TabsList className="border-theme-secondary-300 border">
            <TabsTrigger value="building">Building</TabsTrigger>
            <TabsTrigger value="floor">Floor</TabsTrigger>
          </TabsList>
          <TabsContent value="floor">
            <MonthlyUtilitySelectFloor props={{ buildingId: monthlyUtiltyBuilding?.[0].buildingID }} />
          </TabsContent>
          <TabsContent value="building">
            <OverviewMonthlyBuilding
              isSearched={isSearched}
              isBuildingLoading={isLoading}
              monthlyUtiltyBuilding={monthlyUtiltyBuilding}
              handleSearchChange={handleSearchChange}
            />
          </TabsContent>
        </Tabs>
      </CardContent>

      <PaginationBar
        onPageChange={handlePageChange}
        isLoading={isLoading}
        page={currentPage}
        totalPages={totalUtilityBuildings}
        totalElements={totalUtilityBuildings}
      />
    </Card>
  )
}

export default OverviewMonthlyUtilityBuilding
