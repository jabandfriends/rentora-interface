import { createBrowserRouter, RouterProvider, ScrollRestoration } from 'react-router-dom'

import { Layout } from '@/components/layout'
import { ROUTES } from '@/constants'
import AllRoomsPage from '@/pages/AllRooms'
import ApartmentCreatePage from '@/pages/ApartmentCreate'
import ApartmentSetup from '@/pages/ApartmentSetup'
import Authentication from '@/pages/Authentication'
import MonthlyInvoicePage from '@/pages/Invoice/MonthlyInvoice/MonthlyInvoice'
import MonthlyInvoiceCreate from '@/pages/Invoice/MonthlyInvoice/MonthlyInvoiceCreate'
import MonthlyInvoiceDetail from '@/pages/Invoice/MonthlyInvoice/MonthlyInvoiceDetail'
import NormalInvoicePage from '@/pages/Invoice/NormalInvoice'
import OverdueInvoicePage from '@/pages/Invoice/OverdueInvoice'
import ServiceInvoicePage from '@/pages/Invoice/ServiceInvoice'
import MaintenanceCreate from '@/pages/Maintenance/MaintenanceCreate'
import MaintenanceDetailPage from '@/pages/Maintenance/MaintenanceDetailPage'
import MaintenancePage from '@/pages/Maintenance/MaintenanceTask'
import OverviewPage from '@/pages/Overview'
import ElectricWaterReportPage from '@/pages/Report/ElectricWaterReport'
import ReceiptReport from '@/pages/Report/ReceiptReport'
import RoomReport from '@/pages/Report/RoomReport'

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <ScrollRestoration />
        <Layout isNavbar={false} />
      </>
    ),
    children: [
      {
        index: true,
        element: <Authentication />,
      },
    ],
  },
  {
    path: '/setup',
    element: (
      <>
        <ScrollRestoration />
        <Layout />
      </>
    ),
    children: [
      {
        path: ROUTES.apartmentCreate.path,
        element: <ApartmentCreatePage />,
      },
      {
        path: ROUTES.apartmentSetup.path,
        element: <ApartmentSetup />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <>
        <ScrollRestoration />
        <Layout />
      </>
    ),
    children: [
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
        path: ROUTES.allRoom.path,
        element: <AllRoomsPage />,
      },
      {
        path: ROUTES.roomReport.path,
        element: <RoomReport />,
      },
      {
        path: ROUTES.receiptReport.path,
        element: <ReceiptReport />,
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
        path: ROUTES.monthlyInvoiceCreate.path,
        element: <MonthlyInvoiceCreate />,
      },
      {
        path: ROUTES.monthlyInvoiceDetail.path,
        element: <MonthlyInvoiceDetail />,
      },
    ],
  },
])

const Router = () => {
  return <RouterProvider router={router} />
}

export default Router
