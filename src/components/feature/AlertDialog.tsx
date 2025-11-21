import {
  Action,
  Cancel,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from '@radix-ui/react-alert-dialog'
import type { ComponentProps } from 'react'

import { cn } from '@/utilities'

function AlertDialog({ ...props }: ComponentProps<typeof Root>) {
  return <Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger({ ...props }: ComponentProps<typeof Trigger>) {
  return <Trigger data-slot="alert-dialog-trigger" {...props} />
}

function AlertDialogPortal({ ...props }: ComponentProps<typeof Portal>) {
  return <Portal data-slot="alert-dialog-portal" {...props} />
}

function AlertDialogOverlay({ className, ...props }: ComponentProps<typeof Overlay>) {
  return (
    <Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 bg-theme-night/40 fixed inset-0 z-50',
        className,
      )}
      {...props}
    />
  )
}

function AlertDialogContent({ className, ...props }: ComponentProps<typeof Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <Content
        data-slot="alert-dialog-content"
        className={cn(
          'bg-theme-light data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 desktop:w-2/4 fixed left-[50%] top-[50%] z-50 grid w-5/6 translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg p-6 shadow-lg duration-200',
          className,
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

function AlertDialogHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn('text-heading-4 flex flex-col gap-2 text-center', className)}
      {...props}
    />
  )
}

function AlertDialogFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn('desktop:flex-row-reverse flex flex-col gap-2', className)}
      {...props}
    />
  )
}

function AlertDialogTitle({ className, ...props }: ComponentProps<typeof Title>) {
  return (
    <Title
      data-slot="alert-dialog-title"
      className={cn('text-heading-3 desktop:text-center text-start font-semibold', className)}
      {...props}
    />
  )
}

function AlertDialogDescription({ className, ...props }: ComponentProps<typeof Description>) {
  return (
    <Description
      data-slot="alert-dialog-description"
      className={cn('text-theme-secondary text-body-2 desktop:text-center text-start', className)}
      {...props}
    />
  )
}

function AlertDialogAction({ className, ...props }: ComponentProps<typeof Action>) {
  return (
    <Action
      className={cn(
        'bg-theme-primary desktop:w-auto hover:bg-theme-primary-400 text-theme-light w-full cursor-pointer rounded-lg px-6 py-2 shadow-sm duration-75',
        className,
      )}
      {...props}
    />
  )
}

function AlertDialogCancel({ className, ...props }: ComponentProps<typeof Cancel>) {
  return (
    <Cancel
      className={cn(
        'border-theme-secondary-300 desktop:w-auto hover:bg-theme-secondary-100/80 w-full cursor-pointer rounded-lg border px-6 py-2 shadow-sm duration-75',
        className,
      )}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}
