import { type Dispatch, type SetStateAction, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common'
import { LoadingPage, PageTableEmpty } from '@/components/ui'
import { DEFAULT_MONTHLY_UTILITY_FLOOR_LIST_DATA } from '@/constants'
import { useRentoraApiFloorList, useRentoraApiMonthlyUtilityFloor } from '@/hooks'
import type { IFloor, IMonthtlyUtilityFloor, IRentoraApiMonthlyUtilityFloorParams } from '@/types'

import MonthlyUtilityFloorCard from './MonthlyUtilityFloorCard'

const MonthlyUtilitySelectFloor = ({ props }: { props: IRentoraApiMonthlyUtilityFloorParams }) => {
  const [currentPage]: [number, Dispatch<SetStateAction<number>>] = useState(
    DEFAULT_MONTHLY_UTILITY_FLOOR_LIST_DATA.page,
  )
  const [selectedFloorId, setSelectedFloorId]: [string, Dispatch<SetStateAction<string>>] = useState('')

  const { buildingId } = props

  //floor data
  const { data: floorNumber } = useRentoraApiFloorList({
    buildingId: buildingId!,
  })

  const { apartmentId } = useParams<{ apartmentId: string }>()

  const { data: monthlyUtilityFloor, isLoading } = useRentoraApiMonthlyUtilityFloor({
    apartmentId: apartmentId!,
    params: {
      buildingId: buildingId!,
      floorId: selectedFloorId,
      page: currentPage,
      size: DEFAULT_MONTHLY_UTILITY_FLOOR_LIST_DATA.size,
    },
  })

  if (isLoading) {
    return <LoadingPage />
  }

  if (!floorNumber || floorNumber.length === 0) {
    return <PageTableEmpty message="No Floor found" />
  }

  return (
    <div className="justify-center space-y-4 rounded-2xl">
      <div>
        <Select value={selectedFloorId} onValueChange={setSelectedFloorId}>
          <SelectTrigger>
            <SelectValue placeholder="Select floor Number" />
          </SelectTrigger>
          <SelectContent>
            {floorNumber.map((floor: IFloor) => (
              <SelectItem key={floor.floorId} value={floor.floorId}>
                <div className="flex items-center gap-2">
                  <span>{floor.floorNumber}</span>
                  <span>{floor.floorName}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        {monthlyUtilityFloor?.map((item: IMonthtlyUtilityFloor, index: number) => (
          <MonthlyUtilityFloorCard key={index} item={item} isLoading={isLoading} />
        ))}
      </div>
    </div>
  )
}

export default MonthlyUtilitySelectFloor
