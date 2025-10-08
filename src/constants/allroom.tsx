import type { IStatsCardProps } from '@/types'

export const All_ROOMS_STAT: Array<IStatsCardProps> = [
  {
    title: 'available rooms',
    count: 29,
    type: 'primary',
  },
  {
    title: 'Pending',
    count: 2,
    type: 'success',
  },
  {
    title: 'Reserved',
    count: 13,
    type: 'warning',
  },
  {
    title: 'Unavailable',
    count: 1,
    type: 'error',
  },
]
export const ALL_ROOMS_DATA = [
  {
    roomno: '101',
    buildings: 'A',
    resident: 'Thanakrit',
    category: 'Monthly',
    moveoutdate: '2025-09-15',
    status: 'Available',
  },
  {
    roomno: '102',
    buildings: 'B',
    resident: 'Thanakrit',
    category: 'Monthly',
    moveoutdate: '2025-09-15',
    status: 'Available',
  },
  {
    roomno: '103',
    buildings: 'C',
    resident: 'Thanakrit',
    category: 'Monthly',
    moveoutdate: '2025-09-15',
    status: 'Available',
  },
]

export const ALL_ROOMS_TABLE_HEADER: Array<string> = [
  'Room No.',
  'Buildings',
  'Resident',
  'Category',
  'Move-in Date',
  'Move-out Date',
  'Rental Type',
  'Contract Status',
  'Room Status',
  'Action',
]

export enum ROOMSTATUSENUM {
  Available = 'available',
  Occupied = 'occupied',
  Maintenance = 'maintenance',
}

export enum SORTDIRENUM {
  Asc = 'asc',
  Desc = 'desc',
}
