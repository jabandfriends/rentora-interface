import { Building, Calendar } from 'lucide-react'
import type { PropsWithChildren } from 'react'

import { PageTableSearchEmpty } from '@/components/ui'
import type { Maybe } from '@/types'

type IMeterReadingFormFilterEmptyProps = PropsWithChildren<{
  month: Maybe<string>
  year: Maybe<string>
  buildingName: Maybe<string>
}>
const MeterReadingFormFilterEmpty = ({ children, month, year, buildingName }: IMeterReadingFormFilterEmptyProps) => {
  if (!year) {
    return (
      <PageTableSearchEmpty
        icon={<Calendar />}
        message="Please select a year"
        subMessage="Select a year to view meter reading"
      />
    )
  }

  if (!buildingName) {
    return (
      <PageTableSearchEmpty
        icon={<Building />}
        message="Please select a building"
        subMessage="Select a building to view meter reading"
      />
    )
  }
  if (!month) {
    return (
      <PageTableSearchEmpty
        icon={<Calendar />}
        message="Please select a month"
        subMessage="Select a month to view meter reading"
      />
    )
  }
  return <>{children}</>
}

export default MeterReadingFormFilterEmpty
