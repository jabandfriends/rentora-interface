import { Building, CircleAlert, CircleCheckBig } from 'lucide-react'

import type { IStatsCardProps } from '@/types'

export const ROOM_REPORT_STATS: Array<IStatsCardProps> = [
  {
    title: 'Rooms',
    count: 5,
    icon: <Building size={22} />,
    type: 'primary',
  },
  {
    title: 'Available',
    count: 2,
    icon: <CircleCheckBig size={22} />,
    type: 'success',
  },
  {
    title: 'Unavailable',
    count: 2,
    icon: <CircleAlert size={22} />,
    type: 'error',
  },
]

export const ROOM_REPORT_DATA = [
  {
    room: 1,
    tenant: 'John Doe',
    reservationHolder: 'Jane Smith',
    amount: 250,
    issueDate: '2022-01-01',
    dueDate: '2022-01-15',
    checkoutDate: '2022-01-20',
    status: 'Unavailable',
  },
  {
    room: 1,
    tenant: 'John Doe',
    reservationHolder: 'Jane Smith',
    amount: 250,
    issueDate: '2022-01-01',
    dueDate: '2022-01-15',
    checkoutDate: '2022-01-20',
    status: 'Unavailable',
  },
  {
    room: 1,
    tenant: 'John Doe',
    reservationHolder: 'Jane Smith',
    amount: 250,
    issueDate: '2022-01-01',
    dueDate: '2022-01-15',
    checkoutDate: '2022-01-20',
    status: 'Unavailable',
  },
]

export const ROOM_REPORT_TABLE_HEADER: Array<string> = [
  'Room',
  'Tenant',
  'Reservation holder',
  'Amount',
  'Issue Date',
  'Due Date',
  'Check-out Date',
  'Status',
  'Action',
]
