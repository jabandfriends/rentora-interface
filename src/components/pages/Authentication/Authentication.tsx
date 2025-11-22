import { Building2, Shield, TrendingUp } from 'lucide-react'

import { Card, Image } from '@/components/common'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/feature'
import { useTabQuery } from '@/hooks'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import UserPasswordDialog from './UserPasswordDialog'

const Authentication = () => {
  const { currentTab, setTab } = useTabQuery('Login')
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="border-theme-secondary-300 desktop:flex-row flex w-full max-w-5xl justify-start overflow-hidden rounded-2xl border">
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
          <Tabs className="space-y-4" value={currentTab} onValueChange={setTab}>
            <TabsList className="border-theme-secondary-300 border">
              <TabsTrigger value="Login">Login</TabsTrigger>
              <TabsTrigger value="Register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="Login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="Register">
              <RegisterForm setTab={setTab} />
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  )
}

export default Authentication
