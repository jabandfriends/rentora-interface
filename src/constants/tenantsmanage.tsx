import type { IStatsCardProps } from '@/types'

export const TENANTS_STAT: Array<IStatsCardProps> = [
  {
    title: 'Total Tenant',
    count: 5,
    type: 'primary',
  },
  {
    title: 'Occupied Tenants',
    count: 2,
    type: 'success',
  },
  {
    title: 'Unoccupied Tenants',
    count: 2,
    type: 'warning',
  },
]
export const TENANTS_DATA = [
  {
    tenantsid: 'TENANT-001',
    name: 'Andre Onana',
    email: 'ThegoatOnana@gmail.com',
    floor: '1',
    unit: '102',
    createdate: '30/08/2024',
    staatus: 'Occupied',
  },
  {
    tenantsid: 'TENANT-002',
    name: 'Jadon Sancho',
    email: 'ThefreedomSancho@gmail.com',
    floor: '-',
    unit: '-',
    createdate: '30/08/2024',
    staatus: 'Unoccupied',
  },
]

export const TENANTS_TABLE_HEADER = [
  'Tenant ID',
  'Name',
  'Email',
  'Unit',
  'Joined On',
  'Status',
  'Occupation',
  'Actions',
]
