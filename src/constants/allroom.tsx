export const ALL_ROOMS_TABLE_HEADER: Array<string> = [
  'Room No.',
  'Building',
  'Floor',
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
