export type TimeFormat = '12h' | '24h'

export interface DateTimePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  name?: string
  onBlur?: () => void
  allowPastDates?: boolean
  timeFormat?: TimeFormat
  minuteStep?: number
  showSeconds?: boolean
  defaultTime?: { hour: number; minute: number; second?: number }
  minDate?: Date
  maxDate?: Date
  dateFormat?: string
  // Form-specific props
  error?: boolean
  required?: boolean
  id?: string
}

export type CalendarProps = {
  mode: 'single'
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  disabled?: boolean
  className?: string
  allowPastDates?: boolean
  minDate?: Date
  maxDate?: Date
}
