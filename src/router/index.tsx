import { createBrowserRouter, RouterProvider, ScrollRestoration } from 'react-router-dom'

import { Layout } from '@/components/layout'
import { RENTORA_API_BASE_URL } from '@/config'
import { ROUTES } from '@/constants'
import { RentoraApiQueryClient } from '@/hooks'
import AccountSettingsPage from '@/pages/Account/AccountSetting'
import AllApartmentPage from '@/pages/AllApartments'
import AllRoomsPage from '@/pages/AllRooms'
import ApartmentCreatePage from '@/pages/ApartmentCreate'
import ApartmentSetting from '@/pages/ApartmentSetting'
import ApartmentSetup from '@/pages/ApartmentSetup'
import Authentication from '@/pages/Authentication/Authentication'
import FirstTimePasswordResetPage from '@/pages/Authentication/FirstTimePasswordReset'
import ContractCreate from '@/pages/ContractCreate'
import ContractDetail from '@/pages/ContractDetail'
import InvoiceCreatePage from '@/pages/Invoice/InvoiceCreate'
import InvoiceDetailPage from '@/pages/Invoice/InvoiceDetail'
import MonthlyInvoicePage from '@/pages/Invoice/MonthlyInvoice/MonthlyInvoice'
import MonthlyInvoiceCreate from '@/pages/Invoice/MonthlyInvoice/MonthlyInvoiceCreate'
import MonthlyInvoiceDetail from '@/pages/Invoice/MonthlyInvoice/MonthlyInvoiceDetail'
import NormalInvoicePage from '@/pages/Invoice/NormalInvoice'
import OverdueInvoicePage from '@/pages/Invoice/OverdueInvoice'
import ServiceInvoicePage from '@/pages/Invoice/ServiceInvoice'
import MaintenanceCreate from '@/pages/Maintenance/MaintenanceCreate'
import MaintenanceDetailPage from '@/pages/Maintenance/MaintenanceDetailPage'
import MaintenancePage from '@/pages/Maintenance/MaintenanceTask'
import MaintenanceUpdate from '@/pages/Maintenance/MaintenanceUpdate'
import MeterReadingCreatePage from '@/pages/MeterReading/MeterReadingCreatePage'
import MeterReadingListPage from '@/pages/MeterReading/MeterReadingListPage'
import OverviewPage from '@/pages/Overview'
import PageNotFound from '@/pages/PageNotFound'
import PaymentPage from '@/pages/Payment'
import ElectricWaterReportPage from '@/pages/Report/ElectricWaterReport'
import RoomDetail from '@/pages/RoomDetail'
import SupplyList from '@/pages/Supply'
import SupplyTransactions from '@/pages/SupplyTransactions'
import TenantPage from '@/pages/Tenant/Tenant'
import TenantCreatePage from '@/pages/Tenant/TenantCreate'
import TenantUpdatePassword from '@/pages/Tenant/TenantPasswordUpdate'
import TenantUpdatePage from '@/pages/Tenant/TenantUpdate'
import type { Maybe } from '@/types'
import { parseStorageKey } from '@/utilities'

import RequireApartmentWrapper from './RequireApartmentWrapper'
import RequireAuthWrapper from './RequireAuthWrapper'

const authLoader = async (): Promise<{ valid: boolean; mustChangePassword: boolean }> => {
  const rentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  const auth: Maybe<string> = localStorage.getItem(parseStorageKey('auth'))
  if (!auth) {
    return { valid: false, mustChangePassword: false }
  }
  const { accessToken }: { accessToken: string } = JSON.parse(auth)

  try {
    const { mustChangePassword }: { mustChangePassword: boolean } = await rentoraApiQueryClient.checkAuth(accessToken)
    return { valid: true, mustChangePassword }
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_: unknown) {
    return { valid: false, mustChangePassword: false }
  }
}

//apartmentStatusCheck
const apartmentStatusLoader = async ({
  params,
}: {
  params: { apartmentId?: string }
}): Promise<{ status: Maybe<string>; id: Maybe<string> }> => {
  const rentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)

  try {
    if (!params.apartmentId) {
      return { status: null, id: null }
    }

    const response = await rentoraApiQueryClient.apartmentDetail({ apartmentId: params.apartmentId })

    return { status: response.status, id: params.apartmentId }
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_: unknown) {
    return { status: null, id: null }
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
        <RequireApartmentWrapper>
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
        <RequireApartmentWrapper>
          <ScrollRestoration />
          <Layout />
        </RequireApartmentWrapper>
      </RequireAuthWrapper>
    ),
    children: [
      {
        path: ROUTES.apartmentSetting.path,
        element: <ApartmentSetting />,
      },
      {
        path: ROUTES.overview.path,
        element: <OverviewPage />,
      },
      {
        path: ROUTES.normalInvoice.path,
        element: <NormalInvoicePage />,
      },
      {
        path: ROUTES.monthlyInvoice.path,
        element: <MonthlyInvoicePage />,
      },
      {
        path: ROUTES.invoiceCreate.path,
        element: <InvoiceCreatePage />,
      },
      {
        path: ROUTES.maintenance.path,
        element: <MaintenancePage />,
      },
      {
        path: ROUTES.maintenanceCreate.path,
        element: <MaintenanceCreate />,
      },
      {
        path: ROUTES.maintenanceDetail.path,
        element: <MaintenanceDetailPage />,
      },
      {
        path: ROUTES.maintenanceUpdate.path,
        element: <MaintenanceUpdate />,
      },
      {
        path: ROUTES.allRoom.path,
        element: <AllRoomsPage />,
      },
      {
        path: ROUTES.payment.path,
        element: <PaymentPage />,
      },
      {
        path: ROUTES.roomDetail.path,
        element: <RoomDetail />,
      },

      {
        path: ROUTES.electricWaterReport.path,
        element: <ElectricWaterReportPage />,
      },
      {
        path: ROUTES.overdueInvoice.path,
        element: <OverdueInvoicePage />,
      },
      {
        path: ROUTES.serviceInvoice.path,
        element: <ServiceInvoicePage />,
      },
      {
        path: ROUTES.tenantUpdate.path,
        element: <TenantUpdatePage />,
      },
      {
        path: ROUTES.monthlyInvoiceCreate.path,
        element: <MonthlyInvoiceCreate />,
      },
      {
        path: ROUTES.monthlyInvoiceDetail.path,
        element: <MonthlyInvoiceDetail />,
      },
      {
        path: ROUTES.tenant.path,
        element: <TenantPage />,
      },
      {
        path: ROUTES.tenantCreate.path,
        element: <TenantCreatePage />,
      },
      {
        path: ROUTES.tenantUpdatePassword.path,
        element: <TenantUpdatePassword />,
      },
      {
        path: ROUTES.invoiceDetail.path,
        element: <InvoiceDetailPage />,
      },
      {
        path: ROUTES.contractCreate.path,
        element: <ContractCreate />,
      },
      {
        path: ROUTES.contractDetail.path,
        element: <ContractDetail />,
      },
      {
        path: ROUTES.meterReadingList.path,
        element: <MeterReadingListPage />,
      },
      {
        path: ROUTES.meterReadingCreate.path,
        element: <MeterReadingCreatePage />,
      },
      {
        path: ROUTES.supplyList.path,
        element: <SupplyList />,
      },
      {
        path: ROUTES.supplyTransactions.path,
        element: <SupplyTransactions />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
])

const Router = () => {
  return <RouterProvider router={router} />
}

export default Router
