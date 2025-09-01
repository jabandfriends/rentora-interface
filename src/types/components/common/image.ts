import type { ImgHTMLAttributes } from 'react'

export type IImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string
  fallbackSrc?: string
}
