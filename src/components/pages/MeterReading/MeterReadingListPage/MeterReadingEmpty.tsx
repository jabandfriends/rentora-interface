import { CalendarIcon } from 'lucide-react'

import { Card } from '@/components/common'
import type { Maybe } from '@/types'

type IMeterReadingEmptyProps = {
  filterDate: Maybe<string>
  filteredReadings: Array<any>
}
const MeterReadingEmpty = ({ filterDate, filteredReadings }: IMeterReadingEmptyProps) => {
  if (!filterDate) {
    return (
      <Card className="rounded-2xl p-12 text-center">
        <CalendarIcon className="text-theme-secondary mx-auto size-12" />
        <div>
          <h3>No Date Selected</h3>
          <p className="text-theme-secondary text-body-2">Please select a date to view meter readings</p>
        </div>
      </Card>
    )
  }

  if (filterDate && filteredReadings.length === 0) {
    return (
      <Card className="rounded-2xl p-12 text-center">
        <div>
          <h3>No Readings Found</h3>
          <p className="text-theme-secondary text-body-2">No meter readings found for {filterDate}</p>
        </div>
      </Card>
    )
  }
}

export default MeterReadingEmpty
