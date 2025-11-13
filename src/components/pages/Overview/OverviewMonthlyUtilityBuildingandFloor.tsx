import { ChartColumnBig } from 'lucide-react'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { useParams } from 'react-router-dom'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common'
import { LoadingPage, PageTableEmpty } from '@/components/ui'
import { DEFAULT_MONTHLY_UTILITY_BUILDING_LIST_DATA } from '@/constants'
import {
  useRentoraApiBuildingListNoPaginate,
  useRentoraApiFloorList,
  useRentoraApiMonthlyUtilityBuildings,
  useRentoraApiMonthlyUtilityFloor,
} from '@/hooks'
import type { IBuilding, IFloor, IMonthlyUtilityBuilding, IMonthtlyUtilityFloor } from '@/types'

import { MonthlyUtilityBuildingCard } from './OverviewMonthlyUtilityBuilding'
import { MonthlyUtilityFloorCard } from './OverviewMonthlyUtilityFloor'

const OverviewMonthlyUtilityBuilding = () => {
  const [selectedBuildingId, setSelectedBuildingId]: [string, Dispatch<SetStateAction<string>>] = useState('')
  const [selectedFloorId, setSelectedFloorId]: [string, Dispatch<SetStateAction<string>>] = useState('')

  const { apartmentId } = useParams<{ apartmentId: string }>()

  const { data: monthlyUtiltyBuilding, isLoading } = useRentoraApiMonthlyUtilityBuildings({
    apartmentId: apartmentId!,
    params: {
      size: DEFAULT_MONTHLY_UTILITY_BUILDING_LIST_DATA.size,
      buildingId: selectedBuildingId,
    },
  })

  //building select data
  const { data: buildingNumber } = useRentoraApiBuildingListNoPaginate({
    apartmentId: apartmentId!,
  })

  const BuildingSelected = monthlyUtiltyBuilding[0]

  const { data: floorNumber } = useRentoraApiFloorList({
    buildingId: BuildingSelected?.buildingID,
  })

  const { data: monthlyUtilityFloor } = useRentoraApiMonthlyUtilityFloor({
    apartmentId: apartmentId!,
    params: {
      buildingId: BuildingSelected?.buildingID,
      floorId: selectedFloorId,
    },
  })

  if (isLoading) {
    return <LoadingPage />
  }

  if (!floorNumber || floorNumber.length === 0) {
    return <PageTableEmpty message="No floors available in this building yet 🏢" />
  }

  const isUtilityDataEmpty = !BuildingSelected || Object.keys(BuildingSelected.utilityGroupName || {}).length === 0

  return (
    <Card className="justify-start rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChartColumnBig className="size-5" />
          Building and Floor Utility
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row justify-start gap-2">
          <div>
            <Select value={selectedBuildingId} onValueChange={setSelectedBuildingId}>
              <SelectTrigger>
                <SelectValue placeholder="Select Building" />
              </SelectTrigger>
              <SelectContent>
                {buildingNumber?.map((building: IBuilding) => (
                  <SelectItem key={building.id} value={building.id}>
                    <div className="flex items-center gap-2">
                      <span>{building.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
        </div>

        {isLoading ? (
          <p>Loading monthly utility data...</p>
        ) : isUtilityDataEmpty ? (
          <PageTableEmpty message="Selected building has no recorded utility data. 📊" />
        ) : (
          <div className="space-y-6">
            <div>
              {monthlyUtiltyBuilding?.map((item: IMonthlyUtilityBuilding, index: number) => (
                <MonthlyUtilityBuildingCard key={index} item={item} isloading={isLoading} />
              ))}
            </div>
            <div>
              {monthlyUtilityFloor?.map((item: IMonthtlyUtilityFloor, index: number) => (
                <MonthlyUtilityFloorCard key={index} item={item} isLoading={isLoading} />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default OverviewMonthlyUtilityBuilding
