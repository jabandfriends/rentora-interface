import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button, DateTimePicker, Form, FormField, Input, InputNumber } from '@/components/common'
import { TENANT_FORM_FIELDS, TENANT_FORM_SCHEMA } from '@/constants'
import type { TENANT_FORM_SCHEMA_TYPE } from '@/types'

const UpdateTenant = ({ onSubmit }: TENANT_FORM_SCHEMA_TYPE) => {
  // const navigate = useNavigate()
  const form = useForm<TENANT_FORM_SCHEMA_TYPE>({
    resolver: zodResolver(TENANT_FORM_SCHEMA),
    defaultValues: {
      firstname: '',
      lastname: '',
      emial: '',
      phone: '',
      id: '',
      birthdate: '',
      floor: '',
      room: '',
    },
  })

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col">
        <h2>Update Tenant</h2>
        <p className="text-theme-secondary font-light">Fill out the form below to update tenant.</p>
      </div>
      <div className="rounded-4xl bg-theme-light flex flex-col gap-5 px-10 py-6 shadow">
        <div className="flex flex-col">
          <h3>Tenant Detail</h3>
          <p className="text-theme-secondary font-light">Basic information about tenant.</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="gap-4 space-y-4">
            <div className="flex flex-row justify-between gap-5">
              <FormField
                control={form.control}
                name="Firstname"
                render={({ field }) => (
                  <div className="w-full">
                    <p className="font-normal">Firstname</p>
                    <Input placeholder="Firstname" {...field} />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="Lastname"
                render={({ field }) => (
                  <div className="w-full">
                    <p className="font-normal">Lastname</p>
                    <Input placeholder="Lastname" {...field} />
                  </div>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="Email"
              render={({ field }) => (
                <div className="w-full">
                  <p className="font-normal">Email</p>
                  <Input placeholder="Email" {...field} />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="Phone number"
              render={({ field }) => (
                <div className="w-full">
                  <p className="font-normal">Name</p>
                  <Input placeholder="Phone number" {...field} />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="National ID"
              render={({ field }) => (
                <div className="w-full">
                  <p className="font-normal">Name</p>
                  <Input placeholder="National ID" {...field} />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="Date of Birth"
              render={({ field }) => (
                <div className="w-full">
                  <p className="font-normal">Name</p>
                  <Input placeholder="Date of Birth" {...field} />
                </div>
              )}
            />
          </form>
        </Form>
      </div>
      <div className="rounded-4xl bg-theme-light flex flex-col gap-5 px-10 py-6 shadow">
        <div className="flex flex-col">
          <h3>Tenant Detail</h3>
          <p className="text-theme-secondary font-light">Basic information about tenant.</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="gap-4 space-y-4">
            <div className="flex flex-row justify-between gap-5">
              <FormField
                control={form.control}
                name="Floor"
                render={({ field }) => (
                  <div className="w-full">
                    <p className="font-normal">Floor</p>
                    <Input placeholder="Floor" {...field} />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="Lastname"
                render={({ field }) => (
                  <div className="w-full">
                    <p className="font-normal">Room no.</p>
                    <Input placeholder="Lastname" {...field} />
                  </div>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
      <div className="flex justify-end">
        <Button className="flex items-center gap-2" type="submit">
          Update
        </Button>
      </div>
    </div>
  )
}

export default UpdateTenant
