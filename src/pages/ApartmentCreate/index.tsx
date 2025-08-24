import { ApartmentCreateForm, ApartmentCreateHeader } from '@/components/pages/ApartmentCreate'

const ApartmentCreatePage = () => {
  return (
    <div className="container mx-auto flex flex-col gap-y-5 py-5">
      <ApartmentCreateHeader />
      <ApartmentCreateForm />
    </div>
  )
}

export default ApartmentCreatePage
