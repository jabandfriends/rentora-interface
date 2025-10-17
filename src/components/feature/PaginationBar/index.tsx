import { Spinner } from '@/components/common'
import { Pagination, PaginationContent } from '@/components/ui'
import type { IPaginationBarProps } from '@/types'

import { ButtonList } from './ButtonList'

const PaginationBar = ({ isLoading = false, ...props }: IPaginationBarProps) => {
  return (
    <Pagination className="justify-end">
      <PaginationContent>
        {isLoading ? <Spinner className="mx-10 size-6" /> : <ButtonList {...props} />}
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationBar
