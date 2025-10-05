import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNavigate,
} from '@/components/ui'

const PaginationBar = () => {
  return (
    <div className="flex items-center justify-between">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationNavigate direction="previous" />
          </PaginationItem>
          <PaginationItem>
            <PaginationButton isActive>1</PaginationButton>
          </PaginationItem>
          <PaginationItem>
            <PaginationButton>2</PaginationButton>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationButton>5</PaginationButton>
          </PaginationItem>
          <PaginationItem>
            <PaginationNavigate direction="next" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export { PaginationBar }
