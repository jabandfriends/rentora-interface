import type { ChangeEvent } from 'react'
import { useParams } from 'react-router-dom'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Spinner } from '@/components/common'
import { SearchBar } from '@/components/feature'
import { ROOMSTATUSENUM } from '@/constants'
import { useRentoraApiBuildingListNoPaginate } from '@/hooks'

type IAllRoomSearchProps = {
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  onStatusChange?: (value: string) => void
  onBuildingChange?: (value: string) => void
}
const AllRoomSearch = ({ onSearchChange, onStatusChange, onBuildingChange }: IAllRoomSearchProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { data: buildingList, isLoading } = useRentoraApiBuildingListNoPaginate({ apartmentId })

  if (isLoading) {
    return <Spinner />
  }
  if (!buildingList) {
    return <Spinner />
  }
  return (
    <div className="bg-theme-light desktop:flex-row flex flex-col gap-x-4 gap-y-2 rounded-2xl px-4 py-4">
      {/* Search */}
      <SearchBar onChange={onSearchChange} />

      <div className="desktop:flex-row flex flex-col gap-2">
        <div className="flex gap-2">
          {/* Status Dropdown */}
          {ROOMSTATUSENUM && (
            <Select onValueChange={onStatusChange}>
              <SelectTrigger className="capitalize">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ROOMSTATUSENUM).map((status) => (
                  <SelectItem className="capitalize" key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Select onValueChange={onBuildingChange}>
            <SelectTrigger>
              <SelectValue placeholder="Building" />
            </SelectTrigger>
            <SelectContent>
              {buildingList.map((building) => (
                <SelectItem key={building.id} value={building.name}>
                  {building.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

export default AllRoomSearch
