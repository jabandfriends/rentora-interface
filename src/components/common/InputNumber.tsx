import { Input } from '@/components/common'
import type { IInputNumberProps } from '@/types'

function InputNumber({ decimal = false, maxChars, onChange, ...props }: IInputNumberProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    if (decimal) {
      value = value.replace(/[^0-9.]/g, '')
      const parts = value.split('.')
      if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('')
      }
    } else {
      value = value.replace(/[^0-9]/g, '')
    }
    if (maxChars && value.length > maxChars) {
      value = value.slice(0, maxChars)
    }
    if (onChange) {
      onChange({
        ...e,
        target: { ...e.target, value },
      })
    }
  }

  return (
    <Input
      {...props}
      type="text"
      inputMode="decimal"
      pattern={decimal ? '[0-9]*[.,]?[0-9]*' : '[0-9]*'}
      onChange={handleChange}
    />
  )
}

export { InputNumber }
