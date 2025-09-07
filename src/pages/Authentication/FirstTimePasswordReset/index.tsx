import { useCallback } from 'react'

import { FirstTimePasswordReset } from '@/components/pages/Authentication'

const FirstTimePasswordResetPage = () => {
  const handleSubmit = useCallback(() => {
    //handle submit with api
    alert('API CALL')
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <FirstTimePasswordReset onSubmit={handleSubmit} />
    </div>
  )
}

export default FirstTimePasswordResetPage
