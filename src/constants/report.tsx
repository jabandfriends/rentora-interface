import { Building, CircleAlert, CircleCheckBig, Clock, DollarSign } from 'lucide-react'

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

export const RECEIPT_REPORT_STATS: Array<IStatsCardProps> = [
  {
    title: 'Total Bills',
    count: 5,
    icon: <DollarSign size={22} />,
    type: 'primary',
  },
  {
    title: 'Paid',
    count: 2,
    icon: <CircleCheckBig size={22} />,
    type: 'success',
  },
  {
    title: 'Unpaid',
    count: 2,
    icon: <Clock size={22} />,
    type: 'warning',
  },
  {
    title: 'Overdue',
    count: 1,
    icon: <CircleAlert size={22} />,
    type: 'error',
  },
]

export const RECEIPT_REPORT_DATA = [
  {
    receipt: 'INV-001',
    tenant: 'John Doe',
    room: '101',
    description: 'Cleaning Service',
    amount: '฿800.00',
    issuedate: '2022-01-01',
    duedate: '2022-01-15',
    status: 'Paid',
  },
]

export const RECEIPT_REPORT_TABLE_HEADER: Array<string> = [
  'Receipt',
  'Tenant',
  'Room',
  'Description',
  'Amount',
  'Issue Date',
  'Due Date',
  'Status',
]
