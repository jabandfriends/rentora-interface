import { zodResolver } from '@hookform/resolvers/zod'
import { useDebounce } from '@uidotdev/usehooks'
import { useCallback, useEffect, useMemo } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

import { filterMeterReadingFormSchema, meterReadingFormSchema, ROUTES } from '@/constants'
import {
  useRentoraApiBuildingListNoPaginate,
  useRentoraApiUnitUtilityAvailableMonth,
  useRentoraApiUnitUtilityAvailableYear,
  useRentoraApiUnitUtilityCreateMeterReading,
  useRentoraApiUnitUtilityUnitWithUtility,
} from '@/hooks'
import type {
  IMeterReadingRequestPayload,
  IUnitWithUtilityResponse,
  Maybe,
  MeterReadingFilterFormValues,
  MeterReadingFormValues,
} from '@/types'
import { getErrorMessage } from '@/utilities'

import MeterReadingFormField from './MeterReadingFormField'
import MeterReadingFormFiltered from './MeterReadingFormFiltered'
import MeterReadingFormFilterEmpty from './MeterReadingFormFilterEmpty'

const MeterReadingForm = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const navigate: NavigateFunction = useNavigate()
  // Filter form
  const filterForm = useForm<MeterReadingFilterFormValues>({
    defaultValues: { buildingName: '', year: '', month: '' },
    resolver: zodResolver(filterMeterReadingFormSchema),
  })
  const [buildingName, year, month]: [Maybe<string>, Maybe<string>, Maybe<string>] = filterForm.watch([
    'buildingName',
    'year',
    'month',
  ])

  const debouncedBuildingName = useDebounce(buildingName, 300)
  const debouncedYear = useDebounce(year, 300)
  const debouncedMonth = useDebounce(month, 300)

  //available buildings
  const { data: availableBuildings, isLoading: isLoadingBuildings } = useRentoraApiBuildingListNoPaginate({
    apartmentId: apartmentId,
  })

  //available years
  const { data: availableYears, isLoading: isLoadingYears } = useRentoraApiUnitUtilityAvailableYear({
    apartmentId: apartmentId,
  })

  //available months
  const { data: availableMonths, isLoading: isLoadingMonths } = useRentoraApiUnitUtilityAvailableMonth({
    apartmentId: apartmentId,
    params: {
      year: Number(debouncedYear),
      buildingName,
    },
  })

  //get all units with utility
  const { data: rooms, isLoading: isLoadingUnitsWithUtility } = useRentoraApiUnitUtilityUnitWithUtility({
    apartmentId: apartmentId,
    params: {
      buildingName: debouncedBuildingName,
    },
    enabled: !!debouncedYear && !!debouncedMonth && !!debouncedBuildingName && !!apartmentId,
  })

  //create meter
  const { mutateAsync: createMeterReading, isPending: isLoadingCreateMeterReading } =
    useRentoraApiUnitUtilityCreateMeterReading({ apartmentId: apartmentId })

  const isSubmitDisabled: boolean = useMemo(() => isLoadingCreateMeterReading, [isLoadingCreateMeterReading])

  const isUnitsLoading: boolean = useMemo(() => isLoadingUnitsWithUtility, [isLoadingUnitsWithUtility])
  const isFilterLoading: boolean = useMemo(
    () => isLoadingYears || isLoadingMonths || isLoadingBuildings,
    [isLoadingYears, isLoadingMonths, isLoadingBuildings],
  )

  // Meter reading form
  const form = useForm<MeterReadingFormValues>({
    resolver: zodResolver(meterReadingFormSchema),
    defaultValues: { rooms: [] },
    mode: 'onChange',
  })

  const { fields, replace } = useFieldArray({ control: form.control, name: 'rooms' })

  useEffect(() => {
    if (rooms?.length) {
      replace(
        rooms.map((room: IUnitWithUtilityResponse) => ({
          unitId: room.unitId,
          unitName: room.unitName,
          unitStatus: room.unitStatus,
          waterStart: room.waterMeterStart ?? 0,
          waterEnd: 0,
          electricStart: room.electricMeterStart ?? 0,
          electricEnd: 0,
        })),
      )
    } else {
      replace([])
    }
  }, [rooms, replace])

  const onSubmit = useCallback(
    async (data: MeterReadingFormValues) => {
      const payload: IMeterReadingRequestPayload = {
        readingMonth: Number(month),
        readingYear: Number(year),
        rooms: data.rooms.map((room) => ({
          unitId: room.unitId,
          unitName: room.unitName,
          waterStart: room.waterStart ?? 0,
          waterEnd: room.waterEnd ?? 0,
          electricStart: room.electricStart ?? 0,
          electricEnd: room.electricEnd ?? 0,
        })),
      }
      try {
        await createMeterReading(payload)
        toast.success('Meter reading created successfully')

        setTimeout(() => {
          navigate(ROUTES.meterReadingList.getPath(apartmentId))
        }, 1000)
      } catch (error) {
        toast.error(getErrorMessage(error))
      }
    },
    [createMeterReading, apartmentId, month, year, navigate],
  )

  return (
    <div className="space-y-6">
      {/* --- Filter Section --- */}
      <MeterReadingFormFiltered
        debouncedYear={debouncedYear}
        debouncedMonth={debouncedMonth}
        availableBuildings={availableBuildings}
        availableMonths={availableMonths?.months}
        availableYears={availableYears?.years}
        filterForm={filterForm}
        isLoading={isFilterLoading}
      />

      {/* --- Form Section --- */}
      <MeterReadingFormFilterEmpty month={month} year={year} buildingName={buildingName}>
        <MeterReadingFormField
          isButtonDisabled={isSubmitDisabled}
          form={form}
          fields={fields}
          onSubmit={onSubmit}
          isLoading={isUnitsLoading}
        />
      </MeterReadingFormFilterEmpty>
    </div>
  )
}

export default MeterReadingForm
