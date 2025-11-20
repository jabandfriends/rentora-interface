import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Spinner } from '@/components/common'
import type { Maybe } from '@/types'

type IMaintenanceSelectYearsProps = {
  availableYears: Maybe<Array<number>>
  isLoading: boolean
  selectedYear: number
  onYearChange: (value: string) => void
}
const MaintenanceSelectYears = ({
  availableYears,
  isLoading,
  selectedYear,
  onYearChange,
}: IMaintenanceSelectYearsProps) => {
  if (isLoading) return <Spinner />
  if (!availableYears || availableYears.length === 0) return null
  return (
    <Select value={selectedYear.toString()} onValueChange={onYearChange}>
      <SelectTrigger className="border-none shadow-none">
        <SelectValue placeholder="Select Year" />
      </SelectTrigger>
      <SelectContent>
        {availableYears.map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default MaintenanceSelectYears
