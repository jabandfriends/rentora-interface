import { Arrow, Content, type PopoverContentProps, Portal, Root, Trigger } from '@radix-ui/react-popover'
import { type Dispatch, type SetStateAction, useCallback, useImperativeHandle, useMemo, useState } from 'react'
import { tv } from 'tailwind-variants'

import type { ICompVariantConfig, IPopoverProps, IPopoverVariants } from '@/types'

const popoverContentVariants: ICompVariantConfig<IPopoverVariants> = tv({
  base: 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50',
  variants: {
    variant: {
      default:
        'bg-card data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 tablet:max-w-72 border-theme-night-600 w-full max-w-[100dvw] rounded-xl border p-4 outline-none',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const PopoverArrow = ({ isShow }: { isShow: boolean }) => {
  if (isShow) {
    return <Arrow className="fill-primary/80" width={8} height={4} />
  }

  return <></>
}

const Popover = ({
  variant,
  children,
  onAfterClosed,
  onAfterOpened,
  placement = 'top',
  trigger,
  ref,
}: IPopoverProps) => {
  const [open, setOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)

  const popoverContentClassName: string = useMemo((): string => {
    return popoverContentVariants({ variant })
  }, [variant])

  const sideOffset: number = useMemo((): number => {
    switch (variant) {
      default:
        return 4
    }
  }, [variant])

  const side: PopoverContentProps['side'] = useMemo((): PopoverContentProps['side'] => {
    return placement
  }, [placement])

  const handleOpenChange: (val: boolean) => void = useCallback(
    (val: boolean): void => {
      setOpen(val)

      // callback after closed
      if (!val && onAfterClosed) {
        setTimeout(() => {
          onAfterClosed()
        }, 500)
        return
      }

      // callback after opened
      if (onAfterOpened) {
        setTimeout(() => {
          onAfterOpened()
        }, 300)
      }
    },
    [onAfterClosed, onAfterOpened],
  )

  useImperativeHandle(
    ref,
    () => ({
      close: () => {
        handleOpenChange(false)
      },
      open: () => {
        handleOpenChange(true)
      },
    }),
    [handleOpenChange],
  )

  return (
    <Root open={open} onOpenChange={handleOpenChange}>
      <Trigger asChild className="cursor-pointer">
        {trigger ?? <button type="button">icon</button>}
      </Trigger>
      <Portal>
        <Content side={side} sideOffset={sideOffset} className={popoverContentClassName}>
          {children}
          <PopoverArrow isShow={variant === 'default'} />
        </Content>
      </Portal>
    </Root>
  )
}

Popover.displayName = 'Popover'

export { Popover }
