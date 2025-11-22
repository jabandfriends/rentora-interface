import { zodResolver } from '@hookform/resolvers/zod'
import { UserPlus } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import z from 'zod'

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/common'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/feature'
import { useRentoraInviteUser } from '@/hooks'
import type { IInviteUserPayload } from '@/types'

const inviteSchema = z.object({
  email: z.email(),
})
type InviteSchemaType = z.infer<typeof inviteSchema>

const InviteModal = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { mutateAsync: inviteUser, isPending: isInviteUser } = useRentoraInviteUser({ apartmentId: apartmentId! })

  const form = useForm<InviteSchemaType>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: '',
    },
  })

  const isButtonDisable: boolean = useMemo(() => {
    return isInviteUser
  }, [isInviteUser])

  const handleSubmit = useCallback(
    async (data: InviteSchemaType) => {
      const payload: IInviteUserPayload = {
        email: data.email,
      }

      await inviteUser(payload)
      form.reset()
    },
    [inviteUser, form],
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center" variant="outline" size="icon">
          <UserPlus className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Users</DialogTitle>
          <DialogDescription>
            Invite users to join this apartment. Enter the email addresses of the users you wish to invite.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel htmlFor="email" className="text-sm font-medium">
                    Email address
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter user email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isButtonDisable} className="w-full">
              Invite
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default InviteModal
