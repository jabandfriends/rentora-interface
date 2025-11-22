import { zodResolver } from '@hookform/resolvers/zod'
import { useSetAtom } from 'jotai'
import { type Dispatch, type SetStateAction, useCallback, useMemo, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { type NavigateFunction, useNavigate } from 'react-router-dom'

import { authAtom, type AuthState } from '@/atoms'
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
import { AUTHENTICATION_FIELDS, AUTHENTICATION_FORM_SCHEMA, ROUTES } from '@/constants'
import { useRentoraApiAuthenticate } from '@/hooks'
import type { AUTHENTICATION_FORM_SCHEMA_TYPE, IRentoraApiClientAuthenticateResponse, SetAtom } from '@/types'
import { cn, getErrorMessage } from '@/utilities'

const LoginForm = () => {
  const [apiErrorMsg, setApiErrorMsg]: [string, Dispatch<SetStateAction<string>>] = useState('')
  const navigate: NavigateFunction = useNavigate()
  const [isNavigate, setIsNavigate]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const form = useForm<AUTHENTICATION_FORM_SCHEMA_TYPE>({
    resolver: zodResolver(AUTHENTICATION_FORM_SCHEMA),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  //hooks
  const { mutateAsync: authenticate, isPending } = useRentoraApiAuthenticate()

  //atom
  const setAuth: SetAtom<AuthState> = useSetAtom(authAtom)

  const buttonDisabled: boolean = useMemo(() => {
    return isPending || !form.formState.isValid || isNavigate
  }, [isPending, form.formState.isValid, isNavigate])

  const onSubmit: SubmitHandler<AUTHENTICATION_FORM_SCHEMA_TYPE> = useCallback(
    async ({ email, password }: AUTHENTICATION_FORM_SCHEMA_TYPE) => {
      try {
        setIsNavigate(true)

        const { accessToken }: IRentoraApiClientAuthenticateResponse['data'] = await authenticate({ email, password })
        setAuth({ accessToken })

        toast.success('Login Successfully')
        setTimeout(() => {
          navigate(ROUTES.allApartment.path)
          setIsNavigate(false)
        }, 500)
      } catch (error: unknown) {
        setApiErrorMsg(getErrorMessage(error))
        toast.error(getErrorMessage(error))
        setIsNavigate(false)
        form.setError('password', {
          type: 'manual',
          message: '',
        })
        form.setError('email', {
          type: 'manual',
          message: '',
        })
      }
    },
    [authenticate, navigate, setAuth, form],
  )
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {AUTHENTICATION_FIELDS.map(({ key, label, placeholder, type }) => (
          <FormField
            key={'form-field-' + key}
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

        <Button block disabled={buttonDisabled} type="submit">
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <Spinner />
              <span>Signing in...</span>
            </div>
          ) : (
            'Sign in'
          )}
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm
