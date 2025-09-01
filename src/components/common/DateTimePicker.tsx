import dayjs from 'dayjs'
import { Calendar, Clock } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common'
import { Popover } from '@/components/common/Popover'
import type { CalendarProps, DateTimePickerProps, TimeFormat } from '@/types'
import { cn, tv } from '@/utilities'

const buttonVariants = tv({
  base: 'focus-visible:ring-ring text-body-2 border-theme-secondary-300 inline-flex items-center justify-center whitespace-nowrap rounded-md border duration-200 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      default:
        'bg-theme-light text-theme-white hover:ring-theme-primary focus-visible:ring-theme-primary hover:ring-1 focus-visible:ring-1',
      outline: 'border-input hover:bg-theme-light hover:text-theme-night border',
    },
    size: {
      default: 'h-9 px-4 py-2',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

const SimpleCalendar = ({
  selected,
  onSelect,
  className,
  allowPastDates = false,
  minDate,
  maxDate,
  ...props
}: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(() => (selected ? dayjs(selected) : dayjs()))

  const daysInMonth = currentMonth.daysInMonth()
  const firstDayOfMonth = currentMonth.startOf('month').day()
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i)
  const today = dayjs()

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i.toString(),
    label: dayjs().month(i).format('MMMM'),
  }))

  const currentYear = currentMonth.year()
  const years = Array.from({ length: 21 }, (_, i) => ({
    value: (currentYear - 10 + i).toString(),
    label: (currentYear - 10 + i).toString(),
  }))

  const handleDateClick = (day: number) => {
    const selectedDate = currentMonth.date(day)

    // Check date restrictions
    if (!allowPastDates && selectedDate.isBefore(today, 'day')) {
      return
    }

    if (minDate && selectedDate.isBefore(dayjs(minDate), 'day')) {
      return
    }

    if (maxDate && selectedDate.isAfter(dayjs(maxDate), 'day')) {
      return
    }

    onSelect?.(selectedDate.toDate())
  }

  const handleMonthSelect = (monthValue: string) => {
    setCurrentMonth((prev) => prev.month(parseInt(monthValue)))
  }

  const handleYearSelect = (yearValue: string) => {
    setCurrentMonth((prev) => prev.year(parseInt(yearValue)))
  }

  const isDateDisabled = (day: number) => {
    const date = currentMonth.date(day)

    if (!allowPastDates && date.isBefore(today, 'day')) return true
    if (minDate && date.isBefore(dayjs(minDate), 'day')) return true
    if (maxDate && date.isAfter(dayjs(maxDate), 'day')) return true

    return false
  }

  return (
    <div className={cn('p-3', className)} {...props}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="border-theme-secondary-300 flex w-full items-center space-x-2 rounded-lg border p-3">
          {/* Month Select */}
          <Select value={currentMonth.month().toString()} onValueChange={handleMonthSelect}>
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Year Select */}
          <Select value={currentYear.toString()} onValueChange={handleYearSelect}>
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year.value} value={year.value}>
                  {year.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day} className="text-theme-primary text-heading-6 p-2 text-center">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty days */}
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="p-2" />
        ))}

        {/* Days */}
        {daysArray.map((day) => {
          const date = currentMonth.date(day)
          const isSelected = selected && dayjs(selected).isSame(date, 'day')
          const isToday = dayjs().isSame(date, 'day')
          const isDisabled = isDateDisabled(day)

          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              disabled={isDisabled}
              className={cn(
                'hover:bg-theme-secondary-200 hover:text-theme-primary cursor-pointer rounded-md p-2 text-sm duration-75',
                [
                  isSelected && 'bg-theme-primary text-theme-white',
                  isToday && 'bg-theme-secondary-200/60 text-theme-primary font-semibold',
                  isDisabled && 'cursor-not-allowed opacity-50 hover:bg-transparent',
                ],
              )}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Clean Time Selector Component
const TimeSelector = ({
  value,
  onChange,
  allowPastDates = false,
  timeFormat = '24h',
  minuteStep = 5,
  showSeconds = false,
}: {
  value?: Date
  onChange?: (date: Date) => void
  allowPastDates?: boolean
  timeFormat?: TimeFormat
  minuteStep?: number
  showSeconds?: boolean
}) => {
  const hours =
    timeFormat === '24h'
      ? Array.from({ length: 24 }, (_, i) => ({ value: i.toString(), label: i.toString().padStart(2, '0') }))
      : Array.from({ length: 12 }, (_, i) => ({ value: (i + 1).toString(), label: (i + 1).toString() }))

  const minutes = Array.from({ length: Math.floor(60 / minuteStep) }, (_, i) => {
    const minute = i * minuteStep
    return { value: minute.toString(), label: minute.toString().padStart(2, '0') }
  })

  const seconds: Array<{ value: string; label: string }> = showSeconds
    ? Array.from({ length: 60 }, (_, i) => ({ value: i.toString(), label: i.toString().padStart(2, '0') }))
    : []

  const currentHour = value ? (timeFormat === '24h' ? value.getHours() : value.getHours() % 12 || 12) : 0
  const currentMinute = value ? value.getMinutes() : 0
  const currentSecond = value ? value.getSeconds() : 0
  const currentPeriod = value && timeFormat === '12h' ? (value.getHours() >= 12 ? 'PM' : 'AM') : null
  const now = dayjs()

  const handleTimeChange = (type: 'hour' | 'minute' | 'second' | 'period', val: string) => {
    if (!value) return

    const newDate = new Date(value)

    if (type === 'hour') {
      const hourVal = parseInt(val)
      if (timeFormat === '12h') {
        const hour24 =
          currentPeriod === 'PM' && hourVal !== 12
            ? hourVal + 12
            : currentPeriod === 'AM' && hourVal === 12
              ? 0
              : hourVal
        newDate.setHours(hour24)
      } else {
        newDate.setHours(hourVal)
      }
    } else if (type === 'minute') {
      newDate.setMinutes(parseInt(val))
    } else if (type === 'second') {
      newDate.setSeconds(parseInt(val))
    } else if (type === 'period') {
      const currentHour24 = newDate.getHours()
      const newHour =
        val === 'PM'
          ? currentHour24 < 12
            ? currentHour24 + 12
            : currentHour24
          : currentHour24 >= 12
            ? currentHour24 - 12
            : currentHour24
      newDate.setHours(newHour)
    }

    // Check if the new time is in the past
    if (!allowPastDates && dayjs(value).isSame(now, 'day') && dayjs(newDate).isBefore(now)) {
      return
    }

    onChange?.(newDate)
  }

  return (
    <div className="border-theme-secondary-200 w-full rounded-lg border">
      <div className="space-y-4 p-3">
        {/* Time Controls */}
        <div className={cn('flex items-center gap-x-2')}>
          <Clock className="size-8" />
          {/* Hours */}
          <div className="w-full">
            <Select value={currentHour.toString()} onValueChange={(val) => handleTimeChange('hour', val)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {hours.map((hour) => (
                  <SelectItem key={hour.value} value={hour.value}>
                    {hour.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Minutes */}
          <div className="w-full">
            <Select value={currentMinute.toString()} onValueChange={(val) => handleTimeChange('minute', val)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {minutes.map((minute) => (
                  <SelectItem key={minute.value} value={minute.value}>
                    {minute.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Seconds (if enabled) */}
          {showSeconds && (
            <div>
              <Select value={currentSecond.toString()} onValueChange={(val) => handleTimeChange('second', val)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {seconds.map((second) => (
                    <SelectItem key={second.value} value={second.value}>
                      {second.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* AM/PM (if 12h format) */}
          {timeFormat === '12h' && (
            <div>
              <label className="text-muted-foreground mb-2 block text-center text-xs font-medium">Period</label>
              <Select value={currentPeriod || 'AM'} onValueChange={(val) => handleTimeChange('period', val)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AM">AM</SelectItem>
                  <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Main DateTime Picker Component
export const DateTimePicker = ({
  value,
  onChange,
  placeholder = 'Select date and time',
  disabled = false,
  className,
  name,
  onBlur,
  allowPastDates = false,
  timeFormat = '24h',
  minuteStep = 5,
  showSeconds = false,
  defaultTime = { hour: 9, minute: 0, second: 0 },
  minDate,
  maxDate,
  dateFormat = timeFormat === '24h'
    ? showSeconds
      ? 'MM/DD/YYYY HH:mm:ss'
      : 'MM/DD/YYYY HH:mm'
    : showSeconds
      ? 'MM/DD/YYYY h:mm:ss A'
      : 'MM/DD/YYYY h:mm A',
  // Form-specific props
  error = false,
  required = false,
  id,
}: DateTimePickerProps) => {
  const [internalDate, setInternalDate] = useState<Date | undefined>(value)

  // Sync with external value changes
  useEffect(() => {
    setInternalDate(value)
  }, [value])

  const handleDateSelect = useCallback(
    (selectedDate: Date | undefined) => {
      if (selectedDate) {
        if (internalDate) {
          selectedDate.setHours(internalDate.getHours())
          selectedDate.setMinutes(internalDate.getMinutes())
          if (showSeconds) {
            selectedDate.setSeconds(internalDate.getSeconds())
          }
        } else {
          selectedDate.setHours(defaultTime.hour)
          selectedDate.setMinutes(defaultTime.minute)
          if (showSeconds && defaultTime.second !== undefined) {
            selectedDate.setSeconds(defaultTime.second)
          }
        }
        setInternalDate(selectedDate)
        onChange?.(selectedDate)
      }
    },
    [internalDate, onChange, showSeconds, defaultTime],
  )

  const handleTimeChange = useCallback(
    (newDate: Date) => {
      setInternalDate(newDate)
      onChange?.(newDate)
    },
    [onChange],
  )

  const displayValue = useMemo(() => {
    if (internalDate) {
      return dayjs(internalDate).format(dateFormat)
    }
    return null
  }, [internalDate, dateFormat])

  const triggerButton = (
    <button
      type="button"
      disabled={disabled}
      name={name}
      id={id}
      onBlur={onBlur}
      aria-required={required}
      aria-invalid={error}
      className={cn(
        `${buttonVariants()} text-theme-night w-full justify-start text-left font-normal`,
        error && 'border-theme-error text-theme-error',
        className,
      )}
    >
      <Calendar className="mr-2 size-4" />

      {internalDate ? (
        <div className="desktop:text-left text-center">{dayjs(internalDate).format('ddd, MMM D, YYYY, h:mm A')}</div>
      ) : (
        <span className="truncate">{displayValue || placeholder}</span>
      )}
    </button>
  )

  return (
    <Popover variant="default" placement="bottom" trigger={triggerButton}>
      <div className="desktop:max-w-none flex max-w-xs flex-col items-center">
        <SimpleCalendar
          mode="single"
          selected={internalDate}
          onSelect={handleDateSelect}
          allowPastDates={allowPastDates}
          minDate={minDate}
          maxDate={maxDate}
        />

        {internalDate && (
          <TimeSelector
            value={internalDate}
            onChange={handleTimeChange}
            allowPastDates={allowPastDates}
            timeFormat={timeFormat}
            minuteStep={minuteStep}
            showSeconds={showSeconds}
          />
        )}
      </div>
    </Popover>
  )
}
