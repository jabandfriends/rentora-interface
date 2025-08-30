import { CircleAlert, CircleCheckBig, Clock, DollarSign } from 'lucide-react'

import type { IStatsCardProps } from '@/types'

export const INVOICE_STATUS: Array<string> = ['All', 'Paid', 'Unpaid', 'Overdue']
export const INVOICE_SORT: Array<string> = ['Date', 'Amount', 'Status']

export const NORMAL_INVOICE_STATS: Array<IStatsCardProps> = [
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
    count: 3,
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

export const OVERDUE_INVOICE_STATS: Array<IStatsCardProps> = [
  {
    title: 'Overdue',
    count: 1,
    icon: <CircleAlert size={22} />,
    type: 'error',
  },
]

//RECHECK : API TYPE LATER
export const NORMAL_INVOICE_DATA = [
  {
    invoice: 'INV-001-123',
    tenant: 'John Doe',
    room: '101',
    description: 'Cleaning Service',
    amount: '฿250.00',
    issueDate: '2022-01-01',
    dueDate: '2022-01-15',
    status: 'Paid',
  },
  {
    invoice: 'INV-001-123',
    tenant: 'John Doe',
    room: '101',
    description: 'Cleaning Service',
    amount: '฿250.00',
    issueDate: '2022-01-01',
    dueDate: '2022-01-15',
    status: 'Paid',
  },
  {
    invoice: 'INV-001-123',
    tenant: 'John Doe',
    room: '101',
    description: 'Cleaning Service',
    amount: '฿250.00',
    issueDate: '2022-01-01',
    dueDate: '2022-01-15',
    status: 'Paid',
  },
]

//RECHECK : API TYPE LATER
export const OVERDUE_INVOICE_DATA = [
  {
    invoice: 'INV-001-123',
    tenant: 'John Doe',
    room: '101',
    description: 'Cleaning Service',
    amount: '฿250.00',
    issueDate: '2022-01-01',
    dueDate: '2022-01-15',
    status: 'Overdue',
  },
]

//NORMAL INVOICE TABLE
export const NORMAL_INVOICE_TABLE_HEADER = [
  'Invoice',
  'Tenant',
  'Room',
  'Description',
  'Amount',
  'Issue Date',
  'Due Date',
  'Status',
  'Action',
]

//overdue invoice table
export const OVERDUE_INVOICE_TABLE_HEADER = [
  'Invoice',
  'Tenant',
  'Room',
  'Description',
  'Amount',
  'Issue Date',
  'Due Date',
  'Status',
]
