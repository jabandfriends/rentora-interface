import { CircleCheckBig, Clock, ScrollText } from 'lucide-react'

import type { IStatsCardProps } from '@/types'

export const MAINTENANCE_STATS: Array<IStatsCardProps> = [
  {
    title: 'Total Reports',
    count: 10,
    icon: <ScrollText size={22} />,
  },
  {
    title: 'Done',
    count: 6,
    icon: <CircleCheckBig size={22} />,
  },
  {
    title: 'Unpaid',
    count: 4,
    icon: <Clock size={22} />,
  },
]

export const MAINTENANCE_STATUS: Array<string> = ['Done', 'Pending', 'Inactive']

export const MAINTENANCE_REPORTS = [
  {
    room: 101,
    buildings: 'A',
    issuesDate: '15/08/2025',
    appointmentDate: '20/08/2025',
    servicerequest: 'น้ำแอร์รั่ว',
    status: 'Pending',
  },
  {
    room: 102,
    buildings: 'A',
    issuesDate: '15/08/2025',
    appointmentDate: '20/08/2025',
    servicerequest: 'น้ำแอร์รั่ว',
    status: 'Pending',
  },
  {
    room: 103,
    buildings: 'A',
    issuesDate: '15/08/2025',
    appointmentDate: '20/08/2025',
    servicerequest: 'น้ำแอร์รั่ว',
    status: 'Done',
  },
  {
    room: 101,
    buildings: 'A',
    issuesDate: '15/08/2025',
    appointmentDate: '20/08/2025',
    servicerequest: 'น้ำแอร์รั่ว',
    status: 'Inactive',
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
