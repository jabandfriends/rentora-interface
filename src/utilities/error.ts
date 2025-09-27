import type { AxiosError } from 'axios'

import type { IRentoraApiClientErrorResponse } from '@/types'

export const getErrorMessage = (error: unknown, fallbackMessage?: string): string => {
  switch (typeof error) {
    case 'string':
      return error
    case 'object': {
      const backendError = error as AxiosError<IRentoraApiClientErrorResponse>

      if (backendError.response?.data) {
        const data = backendError.response.data

        if (data.message) {
          const match = data.message.match(/\{(.+?)\}/)
          if (match) {
            return match[1].replace('=', ': ')
          }

          return data.message
        }
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
