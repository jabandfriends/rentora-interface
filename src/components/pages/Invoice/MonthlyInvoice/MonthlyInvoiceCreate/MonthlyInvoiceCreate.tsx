import { zodResolver } from '@hookform/resolvers/zod'
import { useDebounce } from '@uidotdev/usehooks'
import { ArrowLeft, Calendar, FileText } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

import { Button, Card } from '@/components/common'
import { PageTableEmpty } from '@/components/ui'
import { filterFormSchema, ROOMSTATUSENUM } from '@/constants'
import { useRentoraApiUnitWithMonthlyInvoiceStatus } from '@/hooks'
import type { FilterFormType } from '@/types'

import MonthlyInvoiceCreateFilter from './MonthlyInvoiceCreateFilter'
import MonthlyInvoiceCreateTable from './MonthlyInvoiceCreateTable'

const MonthlyInvoiceCreate = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const filterForm = useForm<FilterFormType>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      paymentDueDate: undefined,
      readingDate: '',
      buildingName: '',
    },
  })

  const [readingDate, buildingName, paymentDueDate]: [string, string, number] = filterForm.watch([
    'readingDate',
    'buildingName',
    'paymentDueDate',
  ])

  const debouncedBuildingName = useDebounce(buildingName, 300)
  const debouncedReadingDate = useDebounce(readingDate, 300)

  const isFilterSelected: boolean = useMemo(
    () => !!debouncedReadingDate && !!debouncedBuildingName && !!paymentDueDate,
    [debouncedReadingDate, debouncedBuildingName, paymentDueDate],
  )
  //get all units with utility
  const { data: rooms } = useRentoraApiUnitWithMonthlyInvoiceStatus({
    apartmentId: apartmentId,
    params: {
      readingDate: debouncedReadingDate!,
      buildingName: debouncedBuildingName!,
      status: ROOMSTATUSENUM.Occupied,
      isExceptDailyContract: true,
    },
    enabled: isFilterSelected,
  })

  const navigate: NavigateFunction = useNavigate()

  const handleReadingDateChange = useCallback(
    (value: string) => {
      filterForm.setValue('readingDate', value)
    },
    [filterForm],
  )
  const handlePaymentDueDateChange = useCallback(
    (value: string) => {
      filterForm.setValue('paymentDueDate', Number(value))
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
            paymentDueDate={paymentDueDate}
            debouncedReadingDate={debouncedReadingDate}
            debouncedBuildingName={debouncedBuildingName}
            onBuildingChange={handleBuildingChange}
            onReadingDateChange={handleReadingDateChange}
            onPaymentDueDateChange={handlePaymentDueDateChange}
            onFilterReset={handleFilterReset}
          />
        </Card>

        {/* Rooms List */}
        {isFilterSelected ? (
          <Card className="rounded-xl py-4 shadow-sm">
            <div>
              <h3>Rooms Invoice Status</h3>
              <p className="text-body-2 text-theme-secondary">Billing Period: {debouncedReadingDate}</p>
            </div>

            {rooms?.length === 0 ? (
              <>
                <PageTableEmpty message="No rooms found" />
              </>
            ) : (
              <div className="desktop:grid-cols-4 grid gap-4">
                {rooms?.map((room) => (
                  <MonthlyInvoiceCreateTable
                    key={room.unitId}
                    room={room}
                    debouncedReadingDate={debouncedReadingDate}
                    paymentDueDate={paymentDueDate}
                  />
                ))}
              </div>
            )}
          </Card>
        ) : (
          <PageTableEmpty
            icon={<Calendar className="size-10" />}
            message="Please select a billing period"
            description="Please select a billing period to view the rooms invoice status."
          />
        )}
      </div>
    </div>
  )
}

export default MonthlyInvoiceCreate
