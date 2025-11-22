import { zodResolver } from '@hookform/resolvers/zod'
import type { SetStateAction } from 'jotai'
import { type Dispatch, useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Spinner,
} from '@/components/common'
import { REGISTER_FIELDS, REGISTER_FORM_SCHEMA } from '@/constants'
import { useRentoraUserRegister } from '@/hooks'
import type { IRegisterPayload, REGISTER_FROM_SCHEMA_TYPE } from '@/types'
import { cn, getErrorMessage } from '@/utilities'

type IRegisterForm = {
  setTab: (tab: string) => void
}
const RegisterForm = ({ setTab }: IRegisterForm) => {
  const [apiErrorMsg, setApiErrorMsg]: [string, Dispatch<SetStateAction<string>>] = useState('')
  const form = useForm<REGISTER_FROM_SCHEMA_TYPE>({
    resolver: zodResolver(REGISTER_FORM_SCHEMA),
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: '',
    },
  })

  const { mutateAsync: register, isPending: isRegisterPending } = useRentoraUserRegister()

  const handleRegister = useCallback(
    async (data: REGISTER_FROM_SCHEMA_TYPE) => {
      const payload: IRegisterPayload = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        phoneNumber: data.phoneNumber,
        isRegistered: true,
      }
      try {
        await register(payload)
        toast.success('Register successfully')
        setTab('Login')
      } catch (error) {
        toast.error(getErrorMessage(error))
        setApiErrorMsg(getErrorMessage(error))
      }
    },
    [register, setTab],
  )

  const isButtonDisable: boolean = useMemo(() => {
    return isRegisterPending
  }, [isRegisterPending])
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-2">
        {REGISTER_FIELDS.map(({ key, label, placeholder, type }) => (
          <FormField
            control={form.control}
            name={key}
            render={({ field, fieldState }) => (
              <FormItem className="w-full">
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input
                    className={cn([
                      fieldState.error
                        ? 'border-theme-error-500 focus:border-theme-error-500 focus:ring-theme-error-500'
                        : '',
                    ])}
                    placeholder={placeholder}
                    type={type}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {apiErrorMsg && (
          <div className="border-theme-error-200 bg-theme-error-50 text-body-2 text-theme-error-600 rounded-lg border p-4">
            {apiErrorMsg}
          </div>
        )}

        <Button block disabled={isButtonDisable} type="submit">
          {isRegisterPending ? (
            <div className="flex items-center justify-center gap-2">
              <Spinner />
              <span>Registering in...</span>
            </div>
          ) : (
            'Register'
          )}
        </Button>
      </form>
    </Form>
  )
}

export default RegisterForm
