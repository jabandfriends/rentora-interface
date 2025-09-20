import { zodResolver } from '@hookform/resolvers/zod'
import { useSetAtom } from 'jotai'
import { type Dispatch, type SetStateAction, useCallback, useMemo, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { type NavigateFunction, useNavigate } from 'react-router-dom'

import { authAtom, type AuthState } from '@/atoms'
import { Button, Card, Form, FormField, FormMessage, Image, Input, Spinner } from '@/components/common'
import { AUTHENTICATION_FIELDS, AUTHENTICATION_FORM_SCHEMA, ROUTES } from '@/constants'
import { useRentoraApiAuthenticate } from '@/hooks'
import type { AUTHENTICATION_FORM_SCHEMA_TYPE, IRentoraApiClientAuthenticateResponse, SetAtom } from '@/types'
import { cn, getErrorMessage } from '@/utilities'

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
      }
    },
    [authenticate, navigate, setAuth],
  )

  return (
    <Card className="desktop:size-3/5 desktop:flex-col desktop:px-16 flex flex-col justify-center gap-y-4 rounded-3xl px-8 shadow">
      <div className="flex flex-col">
        <h2>Guess Who's Back</h2>
        <p>Let's Get You Signed in</p>
      </div>
      <div className="desktop:flex-row flex w-full flex-col items-center justify-between gap-x-4 gap-y-4">
        <div className="desktop:gap-15 desktop:w-1/2 flex w-full flex-col gap-x-6 rounded-3xl">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="desktop:shadow desktop:p-4 flex flex-col items-start gap-5 rounded-3xl"
            >
              <div className="w-full">
                {AUTHENTICATION_FIELDS.map(({ key, label, placeholder, type }) => (
                  <FormField
                    key={'form-field-' + key}
                    control={form.control}
                    name={key}
                    render={({ field, fieldState }) => (
                      <div className="w-full">
                        <p className="font-semibold">{label}</p>
                        <Input
                          className={cn(fieldState.error && 'border-theme-error')}
                          placeholder={placeholder}
                          type={type}
                          {...field}
                        />
                        <FormMessage />
                      </div>
                    )}
                  />
                ))}
                {apiErrorMsg && <p className="text-theme-error text-body-2">{apiErrorMsg}</p>}
              </div>

              <Button disabled={buttonDisabled} type="submit" block>
                {isPending ? <Spinner /> : 'Login'}
              </Button>
            </form>
          </Form>
        </div>
        <div>
          <Image
            className="desktop:h-64 rounded-xl object-cover"
            src="https://media.istockphoto.com/id/1165384568/photo/europe-modern-complex-of-residential-buildings.jpg?s=612x612&w=0&k=20&c=iW4NBiMPKEuvaA7h8wIsPHikhS64eR-5EVPfjQ9GPOA="
            alt="building photo"
          />
        </div>
      </div>
    </Card>
  )
}

export default Authentication
