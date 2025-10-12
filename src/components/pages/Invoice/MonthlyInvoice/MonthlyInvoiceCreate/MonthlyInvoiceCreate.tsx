import { zodResolver } from '@hookform/resolvers/zod'
import { useDebounce } from '@uidotdev/usehooks'
import { AlertCircle, ArrowLeft, Building, CheckCircle, FileText } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

import { Button, Card } from '@/components/common'
import { filterFormSchema } from '@/constants'
import { useRentoraApiUnitUtilityUnitWithUtility } from '@/hooks'
import type { FilterFormType } from '@/types'

import MonthlyInvoiceCreateFilter from './MonthlyInvoiceCreateFilter'
import MonthlyInvoiceCreateTable from './MonthlyInvoiceCreateTable'

const MonthlyInvoiceCreate = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const filterForm = useForm<FilterFormType>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      month: undefined,
      year: undefined,
      buildingName: '',
    },
  })

  const [month, year, buildingName]: [number, number, string] = filterForm.watch(['month', 'year', 'buildingName'])

  const debouncedBuildingName = useDebounce(buildingName, 300)
  const debouncedYear = useDebounce(year, 300)
  const debouncedMonth = useDebounce(month, 300)

  const isFilterSelected: boolean = useMemo(
    () => !!debouncedYear && !!debouncedMonth && !!debouncedBuildingName,
    [debouncedYear, debouncedMonth, debouncedBuildingName],
  )
  //get all units with utility
  const { data: rooms, isLoading: isLoadingUnitsWithUtility } = useRentoraApiUnitUtilityUnitWithUtility({
    apartmentId: apartmentId,
    params: {
      buildingName: debouncedBuildingName!,
    },
    enabled: isFilterSelected,
  })

  const navigate: NavigateFunction = useNavigate()

  const handleYearChange = useCallback(
    (value: number) => {
      filterForm.setValue('year', value)
    },
    [filterForm],
  )

  const handleMonthChange = useCallback(
    (value: number) => {
      filterForm.setValue('month', value)
    },
    [filterForm],
  )

  const handleBuildingChange = useCallback(
    (value: string) => {
      filterForm.setValue('buildingName', value)
    },
    [filterForm],
  )

  const handleFilterReset = useCallback(() => {
    filterForm.reset()
  }, [filterForm])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button className="flex items-center gap-x-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="size-5" />
          Back to Monthly Invoices
        </Button>
      </div>
      <div className="space-y-6">
        {/* Header */}
        <Card className="rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <FileText className="text-theme-primary size-8" />
            <div>
              <h3>Generate Monthly Invoices</h3>
              <p className="text-body-2 text-theme-secondary">Create rent invoices for all units</p>
            </div>
          </div>

          {/* Controls */}
          <MonthlyInvoiceCreateFilter
            debouncedYear={debouncedYear}
            debouncedMonth={debouncedMonth}
            debouncedBuildingName={debouncedBuildingName}
            onBuildingChange={handleBuildingChange}
            onMonthChange={handleMonthChange}
            onYearChange={handleYearChange}
            onFilterReset={handleFilterReset}
          />
        </Card>

        {/* Rooms List */}
        <Card className="rounded-xl py-4 shadow-sm">
          <div>
            <h3>Rooms Invoice Status</h3>
            <p className="text-body-2 text-theme-secondary">
              Billing Period: {debouncedMonth} {debouncedYear}
            </p>
          </div>

          <div className="overflow-x-auto">
            <MonthlyInvoiceCreateTable />
          </div>
        </Card>
      </div>
    </div>
  )
}

export default MonthlyInvoiceCreate
