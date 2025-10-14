import { Skeleton } from '@/components/common'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'

type IPageTableLoadingProps = {
  headerRows?: number
  bodyRows?: number
}
const PageTableLoading = ({ headerRows = 8, bodyRows = 16 }: IPageTableLoadingProps) => {
  return (
    <div className="bg-theme-light flex flex-col gap-y-3 rounded-lg p-5">
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: headerRows }).map((_, index) => (
              <TableHead key={index}>
                <Skeleton className="desktop:w-40 w-20" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: bodyRows }).map((_, index) => (
            <TableRow key={index}>
              {Array.from({ length: headerRows }).map((_, index) => (
                <TableCell key={index}>
                  <Skeleton className="desktop:w-40 w-20" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default PageTableLoading
