import { Upload } from 'lucide-react'
import { type ChangeEvent, useCallback, useMemo, useRef } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button, Input } from '@/components/common'
import type { Maybe, MeterReadingFormValues } from '@/types'
import { getErrorMessage, parseCSVFile } from '@/utilities'

type IMeterReadingUploadCSVProps = {
  form: UseFormReturn<MeterReadingFormValues>
  year: Maybe<string>
  buildingName: Maybe<string>
  month: Maybe<string>
}
const MeterReadingUploadCSV = ({ form, year, buildingName, month }: IMeterReadingUploadCSVProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const handleUploadCSVClick = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const isCSVDisabled: boolean = useMemo(() => {
    return !year || !buildingName || !month
  }, [year, buildingName, month])

  const handleUploadCSV = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      try {
        const csvData = await parseCSVFile(file)
        const currentRooms = form.watch('rooms')

        const updatedRooms = currentRooms.map((room) => {
          const match = csvData.find((r) => r.unitName?.trim().toLowerCase() === room.unitName.trim().toLowerCase())

          if (!match) return room

          return {
            ...room,
            waterEnd: Number(match.waterEnd) || 0,
            electricEnd: Number(match.electricEnd) || 0,
          }
        })

        form.reset({ rooms: updatedRooms })
        toast.success('CSV data uploaded successfully')
      } catch (error) {
        toast.error(getErrorMessage(error))
      }
    },
    [form],
  )
  return (
    <div>
      <Input className="hidden" ref={inputRef} type="file" onChange={handleUploadCSV} accept=".csv" />
      <Button className="flex items-center gap-2" type="button" onClick={handleUploadCSVClick} disabled={isCSVDisabled}>
        <Upload className="size-4" /> Upload CSV
      </Button>
    </div>
  )
}

export default MeterReadingUploadCSV
