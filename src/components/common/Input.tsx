import type { IInputProps } from '@/types'
import { cn } from '@/utilities'

const INPUT_CLASSNAME: string =
  'placeholder:text-body-2 file:text-body-2 flex w-full rounded-md px-3 py-2 outline-none file:border-0 file:bg-transparent file:font-medium placeholder:font-medium focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'

function Input({ className, type, prefix, suffix, ref, error, ...props }: IInputProps) {
  return (
    <div className="focus-within:ring-theme-primary flex w-full flex-col justify-center gap-3 rounded-md duration-75 focus-within:ring-2">
      <div
        className={cn(
          'border-default border-theme-night-600 bg-theme-night-600/10 flex items-center gap-x-2 rounded-md border focus:ring-2',
          [error && 'border-error', prefix && 'px-2'],
          className,
        )}
      >
        {prefix && <div>{prefix}</div>}
        <input type={type} className={INPUT_CLASSNAME} ref={ref} {...props} />
        {suffix && <div>{suffix}</div>}
      </div>
      {error && <span className="text-error text-body-2 -mt-2">{error}</span>}
    </div>
  )
}

export { Input }
