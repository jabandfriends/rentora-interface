import { SelectValue } from '@radix-ui/react-select'
import { useDebounce } from '@uidotdev/usehooks'
import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { Card, Select, SelectContent, SelectItem, SelectTrigger } from '@/components/common'
import { DEFAULT_CONTRACT_LIST_DATA } from '@/constants'
import { useRentoraApiMaintenanceList } from '@/hooks'

import RoomDetailMaintenanceTable from './RoomDetailMaintenanceTable'

const RoomDetailMaintenanceList = () => {
  const { apartmentId, id: unitId } = useParams<{ apartmentId: string; id: string }>()
  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState(
    DEFAULT_CONTRACT_LIST_DATA.page,
  )

  const { watch, setValue } = useForm({
    defaultValues: {
      isRecurring: false,
    },
  })

  const [isRecurring]: [boolean] = watch(['isRecurring'])
  const debouncedIsRecurring = useDebounce(isRecurring ? isRecurring : undefined, 500)

  const {
    data: maintenanceList,
    pagination: { totalPages, totalElements },
    isLoading: isLoadingMaintenanceList,
  } = useRentoraApiMaintenanceList({
    apartmentId,
    params: {
      unitId,
      page: currentPage,
      size: DEFAULT_CONTRACT_LIST_DATA.size,
      isRecurring: debouncedIsRecurring,
    },
  })

  const handleIsRecurringChange = useCallback(
    (value: string) => {
      setValue('isRecurring', value === 'true')
      setCurrentPage(DEFAULT_CONTRACT_LIST_DATA.page)
    },
    [setValue],
  )

  const handlePageChange = useCallback((page: number) => {
    if (page < 1) return
    setCurrentPage(page)
  }, [])

  return (
    <Card className="rounded-2xl shadow-lg hover:shadow-xl">
      <div className="border-theme-secondary-400 desktop:flex-row desktop:items-center flex flex-col justify-between gap-y-2 border-b pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3>Maintenance Log </h3>
            <p className="text-body-2 text-theme-secondary-600">Track maintenance log for this unit</p>
          </div>
        </div>
        <Select onValueChange={handleIsRecurringChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select recurring status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Recurring Maintenance</SelectItem>
            <SelectItem value="false">Not Recurring Maintenance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <RoomDetailMaintenanceTable
        maintenance={maintenanceList}
        isLoading={isLoadingMaintenanceList}
        totalElements={totalElements}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </Card>
  )
}

export default RoomDetailMaintenanceList
