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
