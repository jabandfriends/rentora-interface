import { Indicator, Root } from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'
import { type ComponentProps } from 'react'

import { cn } from '@/utilities'

function Checkbox({ className, ...props }: ComponentProps<typeof Root>) {
  return (
    <Root
      data-slot="checkbox"
      className={cn(
        'aria-invalid:ring-theme-error aria-invalid:border-theme-error border-theme-secondary-400 size-4 shrink-0 rounded-sm border outline-none transition-shadow focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </Indicator>
    </Root>
  )
}

export { Checkbox }
