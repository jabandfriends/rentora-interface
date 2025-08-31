import { CircleAlert, CircleCheckBig, Clock, DollarSign } from 'lucide-react'

import type { IStatsCardProps } from '@/types'

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
  'Action',
]
