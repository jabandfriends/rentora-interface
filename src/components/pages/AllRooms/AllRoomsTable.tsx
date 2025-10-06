import { useCallback } from 'react'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import type { VariantProps } from 'tailwind-variants'

import { PaginationBar } from '@/components/feature'
import {
  Badge,
  PageTableEmpty,
  PageTableLoading,
  PageTableSearchEmpty,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { ALL_ROOMS_TABLE_HEADER, ROUTES } from '@/constants'
import type { IUnit } from '@/types'

import AllRoomsAction from './AllRoomsAction'

type AllRoomsTableProps = {
  data: Array<IUnit>
  onPageChange: (page: number) => void
  isLoading: boolean
  isSearched: boolean
  currentPage: number
  totalPages: number
  totalElements: number
}

const AllRoomsTable = ({
  data,
  onPageChange,
  isLoading,
  isSearched,
  currentPage,
  totalPages,
  totalElements,
}: AllRoomsTableProps) => {
  const navigate: NavigateFunction = useNavigate()
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const statusBadgeVariant = useCallback((unitStatus: string): VariantProps<typeof Badge>['variant'] => {
    switch (unitStatus) {
      case 'available':
        return 'success'
      case 'occupied':
        return 'default'
      case 'maintenance':
        return 'warning'
      default:
        return 'default'
    }
  }, [])

  const contractStatusBadgeVariant = useCallback((contractStatus: string): VariantProps<typeof Badge>['variant'] => {
    switch (contractStatus) {
      case 'draft':
        return 'secondary'
      case 'active':
        return 'success'
      case 'terminated':
        return 'error'
      case 'expired':
        return 'warning'
      case 'renewed':
        return 'default'
      default:
        return 'default'
    }
  }, [])

  const rentalTypeBadgeVariant = useCallback((rentalType: string): VariantProps<typeof Badge>['variant'] => {
    switch (rentalType) {
      case 'monthly':
        return 'success'
      case 'yearly':
        return 'default'
      case 'daily':
        return 'secondary'
      default:
        return 'default'
    }
  }, [])

  const handleRoomDetail = useCallback(
    (unitId: string) => {
      navigate(ROUTES.roomDetail.getPath(apartmentId, unitId))
    },
    [navigate, apartmentId],
  )
  if (isLoading) return <PageTableLoading />
  if (isSearched && data.length === 0) {
    return <PageTableSearchEmpty message="No rooms found" subMessage="No rooms found for this search" />
  }
  if (!data || data.length === 0) {
    return <PageTableEmpty message="No rooms found" />
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
          {data.map((item: IUnit, index) => (
            <TableRow key={index} onClick={() => handleRoomDetail(item.id)}>
              <TableCell>{item.unitName}</TableCell>
              <TableCell>{item.buildingName}</TableCell>
              <TableCell className="capitalize">{item.currentTenant || 'N/A'}</TableCell>
              <TableCell className="capitalize">{item.unitType || 'N/A'}</TableCell>
              <TableCell>{item.contractStartDate || 'N/A'}</TableCell>
              <TableCell>{item.contractEndDate || 'N/A'}</TableCell>
              <TableCell className="capitalize">
                <Badge variant={rentalTypeBadgeVariant(item.rentalType)} className="capitalize">
                  {item.rentalType || 'N/A'}
                </Badge>
              </TableCell>
              <TableCell className="capitalize">
                <Badge variant={contractStatusBadgeVariant(item.contractStatus)} className="capitalize">
                  {item.contractStatus || 'N/A'}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={statusBadgeVariant(item.unitStatus)} className="capitalize">
                  {item.unitStatus}
                </Badge>
              </TableCell>
              <TableCell>
                <AllRoomsAction unitId={item.id} />
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
