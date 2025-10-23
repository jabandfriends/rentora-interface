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

type PaymentTableProps = {
  data: Array<any>
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
              <TableCell className="text-theme-primary">{item.payment_number || <FieldEmpty />}</TableCell>
              <TableCell>{item.amount ? `$${item.amount.toFixed(2)}` : <FieldEmpty />}</TableCell>
              <TableCell>{item.paid_at || <FieldEmpty />}</TableCell>

              <TableCell>
                <Badge
                  variant={
                    item.payment_status === 'completed'
                      ? 'success'
                      : item.payment_status === 'pending'
                        ? 'warning'
                        : 'error'
                  }
                  className="capitalize"
                >
                  {item.payment_status || <FieldEmpty />}
                </Badge>
              </TableCell>

              <TableCell>
                <Badge
                  variant={
                    item.verified_status === 'verified'
                      ? 'success'
                      : item.verified_status === 'rejected'
                        ? 'error'
                        : 'secondary'
                  }
                  className="capitalize"
                >
                  {item.verified_status || <FieldEmpty />}
                </Badge>
              </TableCell>

              <TableCell>
                {item.receipt_url ? (
                  <a
                    href={item.receipt_url}
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
