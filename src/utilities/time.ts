import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import type { DateDiff } from '@/types'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)

/**
 * Format ISO timestamp to readable string
 * @param isoString - e.g. "2025-09-17T17:13:27.194662Z"
 * @param format - optional, default "YYYY-MM-DD HH:mm:ss"
 * @param tz - optional, timezone, default local
 * @returns formatted string
 */
export function formatTimestamp(isoString: string, format = 'YYYY-MM-DD HH:mm:ss', tz?: string) {
  if (!isoString) {
    return ''
  }
  if (tz) {
    return dayjs.utc(isoString).tz(tz).format(format)
  }
  return dayjs(isoString).format(format)
}
//format date
export function formatDate(date: Date, format = 'DD-MM-YYYY HH:mm:ss') {
  if (!date) {
    return ''
  }
  return dayjs(date).format(format)
}

//calculate month
export function calculateMonth(startDate: Date, endDate: Date) {
  if (!startDate || !endDate) {
    return 0
  }
  return dayjs(endDate).diff(dayjs(startDate), 'month')
}

//get date diff
export function getDateDiff(startDate: string | Date, endDate: string | Date): DateDiff {
  if (!startDate || !endDate) {
    return { days: 0, months: 0, years: 0 }
  }
  const start = dayjs(startDate)
  const end = dayjs(endDate)

  if (!start.isValid() || !end.isValid()) {
    return { days: 0, months: 0, years: 0 }
  }

  const days = end.diff(start, 'day') + 1
  const months = end.diff(start, 'month') + 1
  const years = end.diff(start, 'year') + 1

  return { days, months, years }
}

/**
 * Get relative time from now
 * @param isoString
 * @returns e.g. "3 hours ago"
 */
export function timeFromNow(isoString: string) {
  if (!isoString) {
    return ''
  }
  return dayjs(isoString).fromNow()
}

//getmonth name by number
export function getMonthNameByNumber(monthNumber: number) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return monthNames[monthNumber - 1]
}
