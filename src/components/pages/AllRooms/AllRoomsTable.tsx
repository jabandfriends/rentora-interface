import { PackageOpen, SquarePen } from 'lucide-react'

import { PaginationBar } from '@/components/feature'
import { Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { ALL_ROOMS_TABLE_HEADER } from '@/constants'
import type { IUnit } from '@/types'

import AllRoomTableLoading from './AllRoomTableLoading'

//RECHECK : api type
type AllRoomsTableProps = {
  data: Array<IUnit>
  onPageChange: (page: number) => void
  isLoading: boolean
  currentPage: number
  totalPages: number
  totalElements: number
}
//RECHECK : API TYPE
const AllRoomsTable = ({
  data,
  onPageChange,
  isLoading,
  currentPage,
  totalPages,
  totalElements,
}: AllRoomsTableProps) => {
  if (isLoading) return <AllRoomTableLoading />

  if (!data || data.length === 0) {
    return (
      <div className="bg-theme-light flex h-1/2 flex-col items-center justify-center rounded-lg p-5">
        <PackageOpen size={50} />
        <p className="text-theme-secondary text-body-1">No rooms found</p>
      </div>
    )
  }

  return (
    <div className="bg-theme-light flex flex-col gap-y-3 rounded-lg p-5">
      <Table>
        <TableHeader>
          <TableRow>
            {ALL_ROOMS_TABLE_HEADER.map((header: string) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* RECHECK : API TYPE */}
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.unitName}</TableCell>
              <TableCell>{item.buildingName}</TableCell>
              <TableCell className="capitalize">{item.currentTenant}</TableCell>
              <TableCell className="capitalize">{item.unitType}</TableCell>
              <TableCell>{item.contractEndDate}</TableCell>
              <TableCell>
                <Badge variant="success" className="capitalize">
                  {item.unitStatus}
                </Badge>
              </TableCell>

              <TableCell>
                <SquarePen size={20} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationBar
        onPageChange={onPageChange}
        isLoading={isLoading}
        page={currentPage}
        totalPages={totalPages}
        totalElements={totalElements}
      />
    </div>
  )
}

export default AllRoomsTable
