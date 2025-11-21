import { AlertTriangle, Check, CircleAlert, Copy, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/common'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/feature'
import { Alert, AlertDescription } from '@/components/ui'
import { testUsers } from '@/constants'
import type { TestUser } from '@/types'

type CopyField = `email-${number}` | `password-${number}`

const UserPasswordDialog = () => {
  const [open, setOpen] = useState(false)
  const [showPassword, setShowPassword] = useState<Record<number, boolean>>({})
  const [copiedField, setCopiedField] = useState<CopyField | null>(null)

  // Sample test users

  const togglePasswordVisibility = (userId: number) => {
    setShowPassword((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }))
  }

  const copyToClipboard = (text: string, field: CopyField) => {
    void navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-x-2" size="icon" variant="ghost">
          <CircleAlert className="text-theme-error size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Test User Credentials</DialogTitle>
          <DialogDescription>Development environment credentials for testing purposes</DialogDescription>
        </DialogHeader>

        <Alert className="border-theme-warning text-theme-warning bg-theme-warning-100/60">
          <AlertTriangle className="text-theme-warning size-5" />
          <AlertDescription className="text-theme-warning-800 ml-2">
            <strong className="font-semibold">Test Phase Only:</strong> These credentials are for testing purposes only.
            Never use these in production. All passwords will be reset before production deployment.
          </AlertDescription>
        </Alert>

        <div className="mt-4 space-y-4">
          {testUsers.map((user: TestUser) => (
            <div
              key={user.id}
              className="border-theme-secondary-300 hover:bg-theme-primary-100/60 rounded-lg border p-4 duration-100"
            >
              <h4 className="mb-3 font-semibold text-slate-800">{user.name}</h4>

              <div className="space-y-3">
                {/* Email */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1">
                    <label className="text-body-2 font-medium">Email</label>
                    <div className="mt-1 flex items-center gap-2">
                      <code className="border-theme-secondary-300 text-body-2 flex-1 rounded border px-3 py-2">
                        {user.email}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="flex items-center"
                        onClick={() => copyToClipboard(user.email, `email-${user.id}`)}
                        title="Copy email"
                      >
                        {copiedField === `email-${user.id}` ? (
                          <Check className="size-4" />
                        ) : (
                          <Copy className="size-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1">
                    <label className="text-body-2 font-medium">Password</label>
                    <div className="mt-1 flex items-center gap-2">
                      <code className="border-theme-secondary-300 text-body-2 flex-1 rounded border px-3 py-2 font-mono">
                        {showPassword[user.id] ? user.password : '••••••••••'}
                      </code>
                      <Button
                        onClick={() => togglePasswordVisibility(user.id)}
                        variant="ghost"
                        size="icon"
                        className="flex items-center"
                        title={showPassword[user.id] ? 'Hide password' : 'Show password'}
                      >
                        {showPassword[user.id] ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </Button>
                      <Button
                        onClick={() => copyToClipboard(user.password, `password-${user.id}`)}
                        className="flex items-center"
                        variant="ghost"
                        size="icon"
                        title="Copy password"
                      >
                        {copiedField === `password-${user.id}` ? (
                          <Check className="size-4" />
                        ) : (
                          <Copy className="size-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-theme-primary bg-theme-primary-100/60 text-theme-primary-600 mt-6 rounded-lg border p-4">
          <p className="text-body-2 text-blue-800">
            <strong>Note:</strong> In production, passwords should never be stored in plain text or displayed to users.
            This is a development utility only.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UserPasswordDialog
