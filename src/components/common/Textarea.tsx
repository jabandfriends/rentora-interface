import { cn } from '@/utilities'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-input placeholder:text-secondary-foreground focus-visible:border-ring focus:ring-theme-primary focus-visible:ring-ring/50 aria-invalid:ring-theme-error/20 dark:aria-invalid:ring-theme-error/40 aria-invalid:border-theme-error field-sizing-content md:text-body-2 border-theme-night-600 flex min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base outline-none duration-100 focus-visible:ring-[2px] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
