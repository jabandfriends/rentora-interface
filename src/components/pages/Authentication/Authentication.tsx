import { zodResolver } from '@hookform/resolvers/zod'
import { useSetAtom } from 'jotai'
import { Building2, Shield, TrendingUp } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useMemo, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { type NavigateFunction, useNavigate } from 'react-router-dom'

import { authAtom, type AuthState } from '@/atoms'
import {
  Button,
  Card,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Image,
  Input,
  Spinner,
} from '@/components/common'
import { AUTHENTICATION_FIELDS, AUTHENTICATION_FORM_SCHEMA, ROUTES } from '@/constants'
import { useRentoraApiAuthenticate } from '@/hooks'
import type { AUTHENTICATION_FORM_SCHEMA_TYPE, IRentoraApiClientAuthenticateResponse, SetAtom } from '@/types'
import { cn, getErrorMessage } from '@/utilities'

import UserPasswordDialog from './UserPasswordDialog'

const Authentication = () => {
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
    <div className="flex min-h-screen items-center justify-center">
      <Card className="border-theme-secondary-300 desktop:flex-row flex w-full max-w-5xl overflow-hidden rounded-2xl border">
        {/* Left Side - Image with Overlay */}
        <div className="desktop:block bg-theme-secondary-600 relative hidden w-1/2 overflow-hidden rounded-xl">
          <Image
            className="h-full w-full rounded-xl object-cover opacity-40"
            src="https://media.istockphoto.com/id/1165384568/photo/europe-modern-complex-of-residential-buildings.jpg?s=612x612&w=0&k=20&c=iW4NBiMPKEuvaA7h8wIsPHikhS64eR-5EVPfjQ9GPOA="
            alt="Modern residential buildings"
          />

          {/* Overlay Content */}
          <div className="text-theme-white absolute inset-0 flex flex-col items-start justify-end space-y-12 p-12">
            <div className="space-y-4">
              <h2 className="font-semibold">Property Management Made Simple</h2>
              <p className="text-body-1 text-theme-secondary-200">
                Streamline your rental operations with our comprehensive platform.
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-theme-secondary/40 flex size-10 items-center justify-center rounded-lg">
                  <Building2 className="h-5 w-5" />
                </div>
                <span className="text-body-1 font-medium">Smart Property Listing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-theme-secondary/40 flex size-10 items-center justify-center rounded-lg">
                  <Shield className="size-5" />
                </div>
                <span className="text-body-1 font-medium">Secure Tenant Management</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-theme-secondary/40 flex size-10 items-center justify-center rounded-lg">
                  <TrendingUp className="size-5" />
                </div>
                <span className="text-body-1 font-medium">Real-time Analytics</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="desktop:w-1/2 desktop:p-16 flex w-full flex-col justify-center space-y-10 p-8">
          {/* Logo/Brand */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-theme-primary flex size-10 items-center justify-center rounded-lg">
                  <Building2 className="text-theme-white size-5" />
                </div>
                <h4>Rentora</h4>
              </div>
              <UserPasswordDialog />
            </div>

            <div className="space-y-2">
              <h2>Welcome back</h2>
              <p className="text-body-2 text-theme-secondary-600">Enter your credentials to access your account</p>
            </div>
          </div>

          {/* Form */}
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

              {/* Options */}
              <div className="flex items-center justify-between">
                <label className="text-body-2 flex items-center gap-2 text-slate-600">
                  <Checkbox />
                  Remember me
                </label>
                <p className="text-body-2 hover:text-theme-primary cursor-pointer font-semibold duration-100">
                  Forgot password?
                </p>
              </div>

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

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-body-2">
              Don't have an account? <p className="hover:text-theme-primary font-medium">Sign up</p>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Authentication
