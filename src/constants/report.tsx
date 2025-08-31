import { Building, CircleAlert, CircleCheckBig, Droplet, Zap } from 'lucide-react'

import type { IStatsCardProps } from '@/types'

//room report stats
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

//room report table header
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

//room report table data
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

//electric & water report stats
export const ELECTRIC_WATER_REPORT_STATS: Array<IStatsCardProps> = [
  {
    title: 'Electric usage',
    count: '฿6,000,000',
    icon: <Zap size={22} />,
    type: 'warning',
  },
  {
    title: 'Water usage',
    count: '฿7,000,000',
    icon: <Droplet size={22} />,
    type: 'primary',
  },
]

export const ELECTRIC_WATER_REPORT_TABLE_HEADER: Array<string> = [
  'Room',
  'Tenant',
  'Electric Usage',
  'Electric Bills',
  'Water Usage',
  'Water Bills',
  'Total Bills',
]

export const ELECTRIC_WATER_REPORT_DATA = [
  {
    room: 1,
    tenant: 'John Doe',
    electricUsage: '100Units',
    electricBills: '฿500',
    waterUsage: '100Units',
    waterBills: '฿200',
    totalBills: '฿700',
  },
  {
    room: 1,
    tenant: 'John Doe',
    electricUsage: '100Units',
    electricBills: '฿500',
    waterUsage: '100Units',
    waterBills: '฿200',
    totalBills: '฿700',
  },
  {
    room: 1,
    tenant: 'John Doe',
    electricUsage: '100Units',
    electricBills: '฿500',
    waterUsage: '100Units',
    waterBills: '฿200',
    totalBills: '฿700',
  },
  {
    room: 1,
    tenant: 'John Doe',
    electricUsage: '100Units',
    electricBills: '฿500',
    waterUsage: '100Units',
    waterBills: '฿200',
    totalBills: '฿700',
  },
]
