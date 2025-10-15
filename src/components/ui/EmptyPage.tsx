import { FolderSearch } from 'lucide-react'
import type { ReactNode } from 'react'

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/feature'

type IEmptyPageProps = {
  icon?: ReactNode
  title: string
  description: string
}
const EmptyPage = ({ icon = <FolderSearch />, title, description }: IEmptyPageProps) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">{icon}</EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

export default EmptyPage
