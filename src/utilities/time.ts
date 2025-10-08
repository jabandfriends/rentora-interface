import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

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
  if (tz) {
    return dayjs.utc(isoString).tz(tz).format(format)
  }
  return dayjs(isoString).format(format)
}
//format date
export function formatDate(date: Date, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(format)
}

//calculate month
export function calculateMonth(startDate: Date, endDate: Date) {
  return dayjs(endDate).diff(dayjs(startDate), 'month')
}

/**
 * Get relative time from now
 * @param isoString
 * @returns e.g. "3 hours ago"
 */
export function timeFromNow(isoString: string) {
  return dayjs(isoString).fromNow()
}
