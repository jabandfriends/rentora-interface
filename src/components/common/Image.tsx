import { type SyntheticEvent, useCallback } from 'react'

import type { IImageProps } from '@/types'

const Image = ({ src, alt, fallbackSrc, onError, ...props }: IImageProps) => {
    const handleError = useCallback<(e: SyntheticEvent<HTMLImageElement>) => void>(
        (e: SyntheticEvent<HTMLImageElement>) => {
            // external onerror case
            if (onError) return onError(e)
            if (fallbackSrc) {
                // fallback case
                e.currentTarget.onerror = null
                e.currentTarget.src = fallbackSrc
            }
        },
        [fallbackSrc, onError],
    )
    return <img src={src} alt={alt} onError={handleError} {...props} />
}

export { Image }
