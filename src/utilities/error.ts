import type { AxiosError } from 'axios'

import type { IRentoraApiClientErrorResponse } from '@/types'

export const getErrorMessage = (error: unknown, fallbackMessage?: string): string => {
  switch (typeof error) {
    case 'string':
      return error
    case 'object': {
      const backendError: AxiosError<IRentoraApiClientErrorResponse> =
        error as AxiosError<IRentoraApiClientErrorResponse>
      if (backendError.response?.data) {
        return backendError.response.data.message
      }
      if (error instanceof Error) {
        return error.message
      }

      return JSON.stringify(error)
    }
    default:
      return fallbackMessage || 'An unknown error occurred'
  }
}
