import { CircleAlert, CircleCheckBig, Clock, DollarSign } from 'lucide-react'
import z from 'zod'

import type { IStatsCardProps } from '@/types'

export const filterFormSchema = z.object({
  readingDate: z.string({ error: 'Reading date is required' }),
  buildingName: z.string({ error: 'Building name is required' }),
})

export enum INVOICE_STATUS {
  Paid = 'paid',
  Unpaid = 'unpaid',
  Overdue = 'overdue',
}

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
export const SERVICE_INVOICE_STATS: Array<IStatsCardProps> = [
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
    count: 1,
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

export const SERVICE_INVOICE_DATA = [
  {
    invoice: 'INV-005',
    tenant: 'John Doe',
    room: '101',
    description: 'Cleaning Service',
    amount: '฿250.00',
    issueDate: '2022-01-01',
    dueDate: '2022-01-15',
    status: 'Paid',
    type: 'success',
  },
  {
    invoice: 'INV-005',
    tenant: 'John Doe',
    room: '101',
    description: 'Cleaning Service',
    amount: '฿250.00',
    issueDate: '2022-01-01',
    dueDate: '2022-01-15',
    status: 'Paid',
    type: 'success',
  },
  {
    invoice: 'INV-005',
    tenant: 'John Doe',
    room: '101',
    description: 'Cleaning Service',
    amount: '฿250.00',
    issueDate: '2022-01-01',
    dueDate: '2022-01-15',
    status: 'Unpaid',
    type: 'warning',
  },
  {
    invoice: 'INV-005',
    tenant: 'John Doe',
    room: '101',
    description: 'Cleaning Service',
    amount: '฿250.00',
    issueDate: '2022-01-01',
    dueDate: '2022-01-15',
    status: 'Overdue',
    type: 'error',
  },
]

//NORMAL INVOICE TABLE
export const NORMAL_INVOICE_TABLE_HEADER = [
  'Invoice Number',
  'Title',
  'Description',
  'Tenant',
  'Room',
  'Amount',
  'Issue Date',
  'Due Date',
  'Status',
  'Action',
]

//overdue invoice table
export const OVERDUE_INVOICE_TABLE_HEADER = ['Invoice', 'Tenant', 'Room', 'Amount', 'Issue Date', 'Due Date', 'Status']

export const SERVICE_INVOICE_TABLE_HEADER = [
  'Invoice',
  'Tenant',
  'Room',
  'Amount',
  'Issue Date',
  'Due Date',
  'Status',
  'Action',
]
