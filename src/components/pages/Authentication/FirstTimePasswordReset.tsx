import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, LockIcon } from 'lucide-react'
import { type HTMLAttributes, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { Button, Form, FormField, FormLabel, FormMessage, Input } from '@/components/common'
import { FIRST_TIME_PASSWORD_RESET_SCHEMA } from '@/constants'
import { cn } from '@/utilities'

type FormSchema = z.infer<typeof FIRST_TIME_PASSWORD_RESET_SCHEMA>

type IFirstTimePasswordResetProps = {
  onSubmit: (data: FormSchema) => void
} & HTMLAttributes<HTMLDivElement>

const FirstTimePasswordReset = ({ className, onSubmit }: IFirstTimePasswordResetProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const handleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev)
  }, [])

  const handleShowConfirmPassword = useCallback(() => {
    setShowConfirmPassword((prev) => !prev)
  }, [])

  const form = useForm<FormSchema>({
    resolver: zodResolver(FIRST_TIME_PASSWORD_RESET_SCHEMA),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })

  return (
    <div className={cn('w-full max-w-md', className)}>
      <div className="border-theme-secondary-300 bg-theme-white space-y-4 rounded-2xl border p-8 shadow-xl">
        <div className="space-y-2 text-center">
          <div className="bg-theme-primary text-theme-white mx-auto flex size-10 items-center justify-center rounded-lg p-2">
            <LockIcon className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h2>Set Your Password</h2>
            <p className="text-theme-secondary">Welcome! Please create a secure password for your first-time login.</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <FormLabel>New Password</FormLabel>
              <div>
                <FormField
                  name="newPassword"
                  render={({ field, fieldState }) => (
                    <div>
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        className={cn([fieldState.error && 'border-theme-error'])}
                        suffix={
                          showPassword ? (
                            <EyeOff className="cursor-pointer" size={16} onClick={handleShowPassword} />
                          ) : (
                            <Eye className="cursor-pointer" size={16} onClick={handleShowPassword} />
                          )
                        }
                        placeholder="Enter your new password"
                      />
                      <FormMessage />
                    </div>
                  )}
                />
              </div>
            </div>

            <div className="space-y-2">
              <FormLabel htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </FormLabel>
              <div>
                <FormField
                  name="confirmPassword"
                  render={({ field, fieldState }) => (
                    <div>
                      <Input
                        {...field}
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Enter your new password"
                        className={cn([fieldState.error && 'border-theme-error'])}
                        suffix={
                          showConfirmPassword ? (
                            <EyeOff className="cursor-pointer" size={16} onClick={handleShowConfirmPassword} />
                          ) : (
                            <Eye className="cursor-pointer" size={16} onClick={handleShowConfirmPassword} />
                          )
                        }
                      />
                      <FormMessage />
                    </div>
                  )}
                />
              </div>
            </div>

            <Button type="submit" block>
              Update Password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default FirstTimePasswordReset
