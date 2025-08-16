import { Root } from '@radix-ui/react-label'
import type { ComponentProps } from 'react'

import { cn } from '@/utilities'

function Label({ className, ...props }: ComponentProps<typeof Root>) {
  return (
    <Root
      data-slot="label"
      className={cn(
        'text-body-2 flex select-none items-center gap-2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

export { Label }
