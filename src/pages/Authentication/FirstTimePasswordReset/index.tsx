import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, LockIcon } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, Form, FormField, FormLabel, FormMessage, Input } from '@/components/common'
import { cn } from '@/utilities'

const formSchema = z
  .object({
    newPassword: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters long'),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    }
  })

type FormSchema = z.infer<typeof formSchema>
const FirstTimePasswordResetPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = useCallback(() => {
    //handle submit with api
    alert('API CALL')
  }, [])

  const handleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev)
  }, [])

  const handleShowConfirmPassword = useCallback(() => {
    setShowConfirmPassword((prev) => !prev)
  }, [])

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <div className="border-theme-secondary-300 space-y-4 rounded-2xl border bg-white p-8 shadow-xl">
          <div className="space-y-2 text-center">
            <div className="bg-theme-primary text-theme-white mx-auto flex size-10 items-center justify-center rounded-lg p-2">
              <LockIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2>Set Your Password</h2>
              <p className="text-theme-secondary">
                Welcome! Please create a secure password for your first-time login.
              </p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
    </div>
  )
}

export default FirstTimePasswordResetPage
