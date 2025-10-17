import { useEffect } from 'react'

import { AuthenticationBody } from '@/components/pages/Authentication'
import { parseStorageKey } from '@/utilities'

const Authentication = () => {
  useEffect(() => {
    window.localStorage.removeItem(parseStorageKey('auth'))
  }, [])
  return (
    <div className="flex size-full h-dvh items-center justify-center px-2">
      <AuthenticationBody />
    </div>
  )
}

export default Authentication
