import {
  Badge,
  FieldEmpty,
  PageTableEmpty,
  PageTableLoading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { PAYMENT_TABLE_HEADER } from '@/constants/payment'
import type { IPayment } from '@/types'

type PaymentTableProps = {
  data: Array<IPayment>
  isLoading: boolean
  //isSearched: boolean
  //currentPage: number
  totalPages: number
  totalElements: number
  //onPageChange: (page: number) => void
}

const PaymentTable = ({ data, isLoading }: PaymentTableProps) => {
  if (isLoading) return <PageTableLoading />
  // if (isSearched && data.length === 0)
  //   return <PageTableSearchEmpty message="No payments found" subMessage="Try adjusting your filters" />
  if (!data || data.length === 0) return <PageTableEmpty message="No payments available" />

  return (
    <div className="bg-theme-light flex flex-col gap-y-3 rounded-lg p-5">
      <Table>
        <TableHeader>
          <TableRow>
            {PAYMENT_TABLE_HEADER.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="text-theme-primary">{item.paymentId || <FieldEmpty />}</TableCell>
              <TableCell>{item.amount ? `$${item.amount.toFixed(2)}` : <FieldEmpty />}</TableCell>
              <TableCell>{item.unitName || <FieldEmpty />}</TableCell>

              <TableCell>
                <Badge
                  variant={
                    item.paymentStatus === 'completed'
                      ? 'success'
                      : item.paymentStatus === 'pending'
                        ? 'warning'
                        : 'error'
                  }
                  className="capitalize"
                >
                  {item.paymentStatus || <FieldEmpty />}
                </Badge>
              </TableCell>

              <TableCell>
                <Badge
                  variant={
                    item.verificationStatus === 'verified'
                      ? 'success'
                      : item.verificationStatus === 'rejected'
                        ? 'error'
                        : 'secondary'
                  }
                  className="capitalize"
                >
                  {item.verificationStatus || <FieldEmpty />}
                </Badge>
              </TableCell>

              <TableCell>
                {item.buildingName ? (
                  <a
                    href={item.buildingName}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-theme-primary underline"
                  >
                    View
                  </a>
                ) : (
                  <FieldEmpty />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* <div className="flex justify-end">
        <PaginationBar
          page={currentPage}
          totalPages={totalPages}
          totalElements={totalElements}
          onPageChange={onPageChange}
          isLoading={isLoading}
        />
      </div> */}
    </div>
  )
}

export default PaymentTable
