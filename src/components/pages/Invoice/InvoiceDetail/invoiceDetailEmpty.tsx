import { ArrowLeft, Search } from 'lucide-react'
import { type NavigateFunction, useNavigate } from 'react-router-dom'

import { Button } from '@/components/common'

const InvoiceDetailEmpty = () => {
  const navigate: NavigateFunction = useNavigate()

  const handleBackClick = () => {
    navigate(-1)
  }

  return (
    <div className="flex h-full w-full flex-col gap-y-6">
      <div className="desktop:flex-row desktop:items-center desktop:justify-between flex flex-col gap-4">
        <div className="flex gap-3">
          <Button className="flex items-center gap-x-2" onClick={handleBackClick}>
            <ArrowLeft className="size-4" />
            Back
          </Button>
        </div>
      </div>
      <div className="bg-theme-light flex h-full w-full flex-col items-center justify-center gap-5 rounded-3xl p-5">
        <Search className="text-theme-secondary" size={56} />
        <p className="text-theme-secondary">This invoice not found</p>
      </div>
    </div>
  )
}

export default InvoiceDetailEmpty
