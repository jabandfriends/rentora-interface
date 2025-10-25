import { useCallback } from 'react'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import type { VariantProps } from 'tailwind-variants'

import { PaginationBar } from '@/components/feature'
import {
  Badge,
  PageTableEmpty,
  PageTableLoading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { ROUTES } from '@/constants'
import { CONTRACT_STATUS } from '@/enum'
import type { IContractSummary } from '@/types'

type IRoomDetailContractTableProps = {
  contracts: Array<IContractSummary>
  isLoading: boolean
  totalElements: number
  currentPage: number
  totalPages: number
  handlePageChange: (page: number) => void
}
const RoomDetailContractTable = ({
  contracts,
  isLoading,
  totalElements,
  currentPage,
  totalPages,
  handlePageChange,
}: IRoomDetailContractTableProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const navigate: NavigateFunction = useNavigate()
  const contractStatusBadgeVariant = useCallback((status: CONTRACT_STATUS): VariantProps<typeof Badge>['variant'] => {
    switch (status) {
      case CONTRACT_STATUS.ACTIVE:
        return 'success'
      case CONTRACT_STATUS.EXPIRED:
        return 'warning'
      case CONTRACT_STATUS.TERMINATED:
        return 'error'
      default:
        return 'default'
    }
  }, [])

  const handleNavigateContractDetail = useCallback(
    (id: string) => {
      navigate(ROUTES.contractDetail.getPath(apartmentId, id))
    },
    [navigate, apartmentId],
  )

  if (isLoading) return <PageTableLoading />

  if (!contracts || contracts.length === 0) return <PageTableEmpty message="No contracts found" />

  return (
    <>
      <Table className="pt-6">
        <TableHeader className="p-4">
          <TableRow>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Rental Type</TableHead>
            <TableHead>Tenant Name</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contracts?.map((contract: IContractSummary) => (
            <TableRow
              key={contract.id}
              onClick={() => handleNavigateContractDetail(contract.id)}
              className="cursor-pointer"
            >
              <TableCell>{contract.startDate}</TableCell>
              <TableCell>{contract.endDate}</TableCell>
              <TableCell className="capitalize">{contract.rentalType}</TableCell>
              <TableCell>{contract.tenantName}</TableCell>
              <TableCell className="capitalize">
                <Badge variant={contractStatusBadgeVariant(contract.status)}>{contract.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationBar
        totalElements={totalElements}
        page={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  )
}

export default RoomDetailContractTable
