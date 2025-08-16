import type { InputHTMLAttributes, ReactNode, RefAttributes } from 'react'

export type IInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> &
  RefAttributes<HTMLInputElement> & {
    prefix?: ReactNode
    suffix?: ReactNode
    error?: string
  }
