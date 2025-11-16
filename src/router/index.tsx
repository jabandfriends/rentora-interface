import { createBrowserRouter, RouterProvider, ScrollRestoration } from 'react-router-dom'

import { Layout } from '@/components/layout'
import { RENTORA_API_BASE_URL } from '@/config'
import { DASHBOARD_ROUTE_ID, DASHBOARD_ROUTES, ROUTES } from '@/constants'
import { TENANT_ROLE } from '@/enum'
import { RentoraApiQueryClient } from '@/hooks'
import AccountSettingsPage from '@/pages/Account/AccountSetting'
import AllApartmentPage from '@/pages/AllApartments'
import ApartmentCreatePage from '@/pages/ApartmentCreate'
import ApartmentSetup from '@/pages/ApartmentSetup'
import Authentication from '@/pages/Authentication/Authentication'
import FirstTimePasswordResetPage from '@/pages/Authentication/FirstTimePasswordReset'
import ForbiddenPage from '@/pages/Forbidden'
import PageNotFound from '@/pages/PageNotFound'
import { type IUserAuthenticationApartmentRole, type IUserAuthenticationResponse, type Maybe } from '@/types'
import { parseStorageKey } from '@/utilities'

import RequireApartmentWrapper from './RequireApartmentWrapper'
import RequireAuthWrapper from './RequireAuthWrapper'

const authLoader = async (): Promise<{
  valid: boolean
  mustChangePassword: boolean
  apartmentRoles: Array<IUserAuthenticationApartmentRole>
}> => {
  const rentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  const auth: Maybe<string> = localStorage.getItem(parseStorageKey('auth'))
  if (!auth) {
    return { valid: false, mustChangePassword: false, apartmentRoles: [] }
  }
  const { accessToken }: { accessToken: string } = JSON.parse(auth)

  try {
    const { mustChangePassword, apartmentRoles }: IUserAuthenticationResponse =
      await rentoraApiQueryClient.checkAuth(accessToken)
    return { valid: true, mustChangePassword, apartmentRoles }
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_: unknown) {
    return { valid: false, mustChangePassword: false, apartmentRoles: [] }
  }
}

//apartmentStatusCheck
const apartmentStatusLoader = async ({
  params,
}: {
  params: { apartmentId?: string }
}): Promise<{ status: Maybe<string>; id: Maybe<string>; userRole: Maybe<TENANT_ROLE> }> => {
  const rentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  try {
    if (!params.apartmentId) {
      return { status: null, id: null, userRole: null }
    }

    const response = await rentoraApiQueryClient.apartmentDetail({ apartmentId: params.apartmentId })

    return { status: response.status, id: params.apartmentId, userRole: response.userRole }
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_: unknown) {
    return { status: null, id: null, userRole: null }
  }
}

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: '/authentication',
    element: (
      <>
        <ScrollRestoration />
        <Layout isSidebar={false} isNavbar={false} />
      </>
    ),
    children: [
      {
        index: true,
        element: <Authentication />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
  {
    path: '/authentication',
    loader: authLoader,
    element: (
      <RequireAuthWrapper>
        <ScrollRestoration />
        <Layout isSidebar={false} />
      </RequireAuthWrapper>
    ),
    children: [
      {
        path: ROUTES.firstTimePasswordReset.path,
        element: <FirstTimePasswordResetPage />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
  {
    path: '/',
    loader: authLoader,
    element: (
      <RequireAuthWrapper>
        <ScrollRestoration />
        <Layout isSidebar={false} />
      </RequireAuthWrapper>
    ),
    children: [
      {
        index: true,
        element: <AllApartmentPage />,
      },
      {
        path: ROUTES.accountSetting.path,
        element: <AccountSettingsPage />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
  {
    path: '/setup/:apartmentId',
    loader: async (args) => {
      const [authData, apartmentData] = await Promise.all([authLoader(), apartmentStatusLoader(args)])

      return {
        ...authData,
        ...apartmentData,
      }
    },
    element: (
      <RequireAuthWrapper>
        <RequireApartmentWrapper allowedRoles={[TENANT_ROLE.ADMIN]}>
          <ScrollRestoration />
          <Layout isSidebar={false} />
        </RequireApartmentWrapper>
      </RequireAuthWrapper>
    ),
    children: [
      {
        index: true,
        element: <ApartmentSetup />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
  {
    path: '/create',
    loader: authLoader,
    element: (
      <RequireAuthWrapper>
        <ScrollRestoration />
        <Layout isSidebar={false} />
      </RequireAuthWrapper>
    ),
    children: [
      {
        path: ROUTES.apartmentCreate.path,
        element: <ApartmentCreatePage />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },

  {
    id: 'dashboard',
    path: '/dashboard/:apartmentId',
    loader: async (args) => {
      const [authData, apartmentData] = await Promise.all([authLoader(), apartmentStatusLoader(args)])

      return {
        ...authData,
        ...apartmentData,
      }
    },
    element: (
      <RequireAuthWrapper>
        <RequireApartmentWrapper
          allowedRoles={[TENANT_ROLE.ADMIN, TENANT_ROLE.ACCOUNTING, TENANT_ROLE.MAINTENANCE]}
          routeId={DASHBOARD_ROUTE_ID}
        >
          <ScrollRestoration />
          <Layout />
        </RequireApartmentWrapper>
      </RequireAuthWrapper>
    ),
    children: DASHBOARD_ROUTES,
  },

  // forbidden
  {
    path: ROUTES.forbidden.path,
    element: <ForbiddenPage />,
  },
])

const Router = () => {
  return <RouterProvider router={router} />
}

export default Router
