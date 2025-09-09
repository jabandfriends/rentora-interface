import { useEffect, useState } from 'react'

import { PageHeader } from '@/components/layout'
import { AllApartments } from '@/components/pages/AllApartments'

const data = [
  {
    id: 1001,
    apartmentName: 'Apartment 1',
    imageUrl:
      'https://images.unsplash.com/photo-1515263487990-61b07816b324?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fHww',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'USA',
    tenants: '10',
  },
  {
    id: 1002,
    apartmentName: 'Apartment 2',
    imageUrl:
      'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?cs=srgb&dl=pexels-sevenstormphotography-439391.jpg&fm=jpg',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'USA',
    tenants: '10',
  },
]
const AllApartmentPage = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])
  return (
    <div className="container mx-auto space-y-4 px-4 py-4">
      <PageHeader title="All Apartments" description="A quick overview of the apartments you manage." />
      <AllApartments data={data} loading={loading} />
      <p className="text-body-2 text-theme-secondary text-center">
        © 2025 Rentora. Simplifying property management for landlords everywhere.
      </p>
    </div>
  )
}

export default AllApartmentPage
