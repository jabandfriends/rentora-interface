import { useCallback, useMemo } from 'react'

import { PaginationButton, PaginationEllipsis, PaginationItem, PaginationNavigate } from '@/components/ui'
import type { IPaginationBarProps } from '@/types'
import { cn } from '@/utilities'

const MAX_VISIBLE_PAGES: number = 5
const HALF_VISIBLE_PAGES: number = Math.floor(MAX_VISIBLE_PAGES / 2)

const generatePageNumbers = (page: number, total: number): Array<number> => {
  // early return for edge cases
  if (total <= 0) return []

  if (total <= MAX_VISIBLE_PAGES) {
    return Array.from({ length: total }, (_: unknown, index: number) => index + 1)
  }

  // calculate start and end pages, ensuring we stay within bounds
  let startPage: number = Math.max(1, page - HALF_VISIBLE_PAGES)
  const endPage = Math.min(total, startPage + MAX_VISIBLE_PAGES - 1)

  // adjust start page if we don't have enough pages
  if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
    startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1)
  }

  const pageNumbers: Array<number> = Array.from(
    { length: endPage - startPage + 1 },
    (_, index: number) => startPage + index,
  )

  // after first item, remove current first page
  if (startPage === 2) {
    pageNumbers.pop()
  }
  // before last item, remove current last page
  if (endPage === total - 1) {
    pageNumbers.shift()
  }
  return pageNumbers
}

export const ButtonList = ({ totalPages, page, onPageChange }: IPaginationBarProps) => {
  const pageNumbers: Array<number> = useMemo((): Array<number> => {
    return generatePageNumbers(page, totalPages)
  }, [page, totalPages])

  const isDisplayLeftEllipsis: boolean = useMemo((): boolean => {
    return pageNumbers.includes(2)
  }, [pageNumbers])

  const isDisplayRightEllipsis: boolean = useMemo((): boolean => {
    return pageNumbers.includes(totalPages - 1)
  }, [pageNumbers, totalPages])

  const handlePageChange: (newPageNumber: number) => void = useCallback(
    (newPageNumber: number) => {
      onPageChange(newPageNumber)
    },
    [onPageChange],
  )

  return (
    <>
      <PaginationItem key="previous" className={cn([totalPages === 1 && 'hidden'])}>
        <PaginationNavigate
          direction="previous"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1 || totalPages === 0}
        />
      </PaginationItem>
      {!pageNumbers.includes(1) && (
        <>
          <PaginationItem key="first">
            <PaginationButton isActive={1 === page} onClick={() => handlePageChange(1)}>
              1
            </PaginationButton>
          </PaginationItem>
          <PaginationEllipsis className={cn([isDisplayLeftEllipsis && 'hidden'])} />
        </>
      )}
      {pageNumbers.map((pageNumber: number) => (
        <PaginationItem key={pageNumber}>
          <PaginationButton
            key={pageNumber}
            isActive={pageNumber === page}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </PaginationButton>
        </PaginationItem>
      ))}
      {!pageNumbers.includes(totalPages) && (
        <>
          <PaginationEllipsis className={cn([isDisplayRightEllipsis && 'hidden'])} />
          <PaginationItem key="last">
            <PaginationButton isActive={totalPages === page} onClick={() => handlePageChange(totalPages)}>
              {totalPages}
            </PaginationButton>
          </PaginationItem>
        </>
      )}
      <PaginationItem key="next" className={cn([totalPages === 1 && 'hidden'])}>
        <PaginationNavigate
          direction="next"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages || totalPages === 0}
        />
      </PaginationItem>
    </>
  )
}
