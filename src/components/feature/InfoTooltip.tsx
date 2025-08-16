import { Info } from 'lucide-react'
import type { PropsWithChildren } from 'react'

import { TooltipContent, TooltipRoot, TooltipTrigger } from '@/components/common'

const InfoTooltip = ({ children }: PropsWithChildren) => {
  return (
    <TooltipRoot>
      <TooltipTrigger>
        <Info className="size-4" />
      </TooltipTrigger>
      <TooltipContent>{children}</TooltipContent>
    </TooltipRoot>
  )
}

export default InfoTooltip
