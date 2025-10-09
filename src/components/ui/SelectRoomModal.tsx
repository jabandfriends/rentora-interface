import { useDebounce } from '@uidotdev/usehooks'
import { Building2, ChevronRight, MapPin, Search } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { Button, Spinner } from '@/components/common'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  SearchBar,
} from '@/components/feature'
import { DEFAULT_UNIT_LIST_DATA } from '@/constants'
import { UnitStatus } from '@/enum'
import { useRentoraApiBuildingListNoPaginate, useRentoraApiUnitList } from '@/hooks'
import type { IBuilding, ISearchBarProps } from '@/types'
import { cn } from '@/utilities'

type ISelectRoomModalProps = {
  onRoomSelect: (roomId: string) => void // for form
  selectedRoomId?: string
}
const SelectRoomModal = ({ onRoomSelect, selectedRoomId }: ISelectRoomModalProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const [currentUnitPage, setCurrentUnitPage]: [number, Dispatch<SetStateAction<number>>] = useState(
    DEFAULT_UNIT_LIST_DATA.page,
  )
  const [selectedUnitName, setSelectedUnitName]: [string, Dispatch<SetStateAction<string>>] = useState('')
  const [showRoomModal, setShowRoomModal]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)

  //form for search unit
  const { watch, setValue } = useForm({
    defaultValues: {
      search: '',
      buildingName: '',
    },
  })

  const [search, buildingName]: [string, string] = watch(['search', 'buildingName'])

  const debouncedSearch = useDebounce(search ? search : undefined, 500)
  const debouncedBuildingName = useDebounce(buildingName ? buildingName : undefined, 200)

  //fetch all building
  const { data: buildings, isLoading: buildingsLoading } = useRentoraApiBuildingListNoPaginate({ apartmentId })

  //fetch all room
  const { data: units, isLoading: unitsLoading } = useRentoraApiUnitList({
    apartmentId: apartmentId!,
    params: {
      page: currentUnitPage,
      size: DEFAULT_UNIT_LIST_DATA.size,
      search: debouncedSearch,
      buildingName: debouncedBuildingName,
      status: UnitStatus.occupied,
    },
    enabled: !!debouncedBuildingName,
  })

  const handleSearchChange: ISearchBarProps['onChange'] = useCallback(
    ({ target: { value } }: Parameters<ISearchBarProps['onChange']>[0]) => {
      setValue('search', value)
      setCurrentUnitPage(DEFAULT_UNIT_LIST_DATA.page)
    },
    [setValue, setCurrentUnitPage],
  )

  const handleBuildingChange = useCallback(
    (value: string) => {
      setValue('buildingName', value)
      setCurrentUnitPage(DEFAULT_UNIT_LIST_DATA.page)
    },
    [setValue, setCurrentUnitPage],
  )

  //loading state
  const isLoading: boolean = useMemo(() => buildingsLoading || unitsLoading, [buildingsLoading, unitsLoading])

  if (isLoading)
    return (
      <Dialog open={showRoomModal} onOpenChange={setShowRoomModal}>
        <DialogContent className="flex max-h-[90vh] max-w-4xl flex-col overflow-hidden p-0">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle>Loading...</DialogTitle>
            <DialogDescription>
              <Spinner />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )

  if (!buildings)
    return (
      <Dialog open={showRoomModal} onOpenChange={setShowRoomModal}>
        <DialogContent className="flex max-h-[90vh] max-w-4xl flex-col overflow-hidden p-0">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle>No Buildings Found</DialogTitle>
            <DialogDescription>
              <p>There are no buildings available for this apartment.</p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )

  return (
    <Dialog open={showRoomModal} onOpenChange={setShowRoomModal}>
      <DialogTrigger asChild>
        {selectedUnitName ? (
          <Button
            variant="outline"
            block
            className="hover:text-theme-white flex h-fit items-center justify-between rounded-lg border border-dashed p-2 text-start"
          >
            <div>
              <h4>{selectedUnitName}</h4>
              <p className="text-body-2">{debouncedBuildingName}</p>
            </div>
            <ChevronRight size={20} className="opacity-80" />
          </Button>
        ) : (
          <Button variant="outline" block className="flex items-center justify-between border-dashed text-start">
            Select Room
            <ChevronRight size={20} className="opacity-80" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="flex max-h-[90vh] max-w-4xl flex-col overflow-hidden p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle>Select Room</DialogTitle>
          <DialogDescription>Choose a building and then select a room for this maintenance task</DialogDescription>
        </DialogHeader>

        {/* Search */}
        {debouncedBuildingName && (
          <div className="px-6 pb-4">
            <SearchBar onChange={handleSearchChange} />
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="desktop:grid-cols-2 grid gap-6">
            <div className="space-y-2">
              <h4 className="flex items-center gap-x-2">
                <Building2 className="size-4" />
                Select Building
              </h4>

              <div className="flex flex-col gap-2">
                {buildings.map((building: IBuilding) => (
                  <div
                    key={'building-' + building.id + building.name}
                    onClick={() => {
                      handleBuildingChange(building.name)
                    }}
                    className={cn('border-1 w-full cursor-pointer rounded-lg px-4 py-3 duration-100 hover:shadow', [
                      debouncedBuildingName === building.name
                        ? 'border-theme-primary bg-theme-primary-100/80 text-theme-primary-600'
                        : 'border-theme-secondary-300 hover:border-theme-primary-300 hover:bg-theme-secondary-50',
                    ])}
                  >
                    <div className="w-full space-y-1 text-left">
                      <div className="font-medium">{building.name}</div>
                      <div
                        className={cn(
                          'text-body-2',
                          debouncedBuildingName === building.name ? 'text-theme-primary' : 'text-theme-secondary',
                        )}
                      >
                        {building.unitCount} rooms
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rooms */}
            <div className="space-y-2">
              <h4 className="flex items-center gap-2">
                <MapPin className="size-4" />
                Select Room
              </h4>
              {!debouncedBuildingName ? (
                <div className="text-theme-secondary flex flex-col items-center justify-center py-12">
                  <Building2 className="text-theme-secondary size-12" />
                  <p>Select a building first</p>
                </div>
              ) : units.length === 0 ? (
                <div className="text-theme-secondary flex flex-col items-center justify-center space-y-3 py-12">
                  <Search className="text-theme-secondary-300 size-12" />
                  <p>No rooms found</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {units.map((unit) => (
                    <div
                      key={unit.id}
                      onClick={() => {
                        onRoomSelect(unit.id)
                        setSelectedUnitName(unit.unitName)
                      }}
                      className={cn(
                        'border-1 border-theme-secondary-300 hover:border-theme-primary-300 hover:bg-theme-secondary-50 cursor-pointer rounded-lg px-4 py-3 text-center font-medium duration-100',
                        [
                          selectedRoomId === unit.id
                            ? 'border-theme-primary bg-theme-primary-100/80 text-theme-primary-600'
                            : '',
                        ],
                      )}
                    >
                      {unit.unitName}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SelectRoomModal
