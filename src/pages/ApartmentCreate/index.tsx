import { ArrowLeftIcon } from 'lucide-react'
import { useCallback } from 'react'
import { type NavigateFunction, useNavigate } from 'react-router-dom'

import { PageHeader, PageSection } from '@/components/layout'
import { ApartmentCreateForm } from '@/components/pages/ApartmentCreate'
import { ROUTES } from '@/constants'

const ApartmentCreatePage = () => {
  const navigate: NavigateFunction = useNavigate()

  const handleNavigateApartment = useCallback(() => {
    navigate(ROUTES.allApartment.path)
  }, [navigate])
  return (
    <PageSection middle>
      <PageHeader
        title="Add New Apartment"
        description="Fill in the apartment details to start managing your property."
        isAction
        actionLabel="Back"
        actionIcon={<ArrowLeftIcon />}
        actionOnClick={handleNavigateApartment}
      />
      <ApartmentCreateForm />
    </PageSection>
  )
}

export default ApartmentCreatePage
