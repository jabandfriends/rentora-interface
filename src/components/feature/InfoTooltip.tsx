import { Info } from 'lucide-react'
import type { PropsWithChildren } from 'react'

import { TooltipContent, TooltipTrigger } from '@/components/common'
import { Tooltip } from '@/components/common/Tooltip'

const InfoTooltip = ({ children }: PropsWithChildren) => {
  return (
    <Tooltip>
      <TooltipTrigger disabled>
        <Info className="size-4" />
      </TooltipTrigger>
      <TooltipContent>{children}</TooltipContent>
    </Tooltip>
  )
}

export default InfoTooltip
