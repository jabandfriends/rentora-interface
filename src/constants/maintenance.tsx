import { CircleCheckBig, Clock, ScrollText } from 'lucide-react'

import type { IStatsCardProps } from '@/types'

export const MAINTENANCE_STATS: Array<IStatsCardProps> = [
  {
    title: 'Total Reports',
    count: 10,
    icon: <ScrollText size={22} />,
    type: 'primary'
  },
  {
    title: 'Done',
    count: 6,
    icon: <CircleCheckBig size={22} />,
    type: 'success'
  },
  {
    title: 'Unpaid',
    count: 4,
    icon: <Clock size={22} />,
    type: 'warning'
  },
]

export const MAINTENANCE_STATUS: Array<string> = ['Done', 'Pending', 'Inactive']

export const MAINTENANCE_TABLE_DATA = [
  {
    room: 101,
    buildings: 'A',
    issuesDate: '15/08/2025',
    appointmentDate: '20/08/2025',
    servicerequest: 'น้ำแอร์รั่ว',
    status: 'Pending',
    type: 'warning',
  },
  {
    room: 102,
    buildings: 'A',
    issuesDate: '15/08/2025',
    appointmentDate: '20/08/2025',
    servicerequest: 'น้ำแอร์รั่ว',
    status: 'Pending',
    type: 'warning',
  },
  {
    room: 103,
    buildings: 'A',
    issuesDate: '15/08/2025',
    appointmentDate: '20/08/2025',
    servicerequest: 'น้ำแอร์รั่ว',
    status: 'Done',
    type: 'success',
  },
  {
    room: 101,
    buildings: 'A',
    issuesDate: '15/08/2025',
    appointmentDate: '20/08/2025',
    servicerequest: 'น้ำแอร์รั่ว',
    status: 'Inactive',
    type: 'error',
  },
]

export const MAINTENANCE_TABLE_HEADER = [
  'Room',
  'Buildings',
  'Issue Date',
  'Appointment Date',
  'Service Request Reason',
  'Status',
]
