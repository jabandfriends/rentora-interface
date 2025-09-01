import type { InputHTMLAttributes, ReactNode, RefAttributes } from 'react'

export type IInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> &
  RefAttributes<HTMLInputElement> & {
    prefix?: ReactNode
    suffix?: ReactNode
    error?: string
  }

export type IInputNumberProps = Omit<IInputProps, 'type'> & {
  decimal?: boolean
  maxChars?: number
}
