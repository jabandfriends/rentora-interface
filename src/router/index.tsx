import { createBrowserRouter, RouterProvider, ScrollRestoration } from 'react-router-dom'

import { Layout } from '@/components/layout'
import { ROUTES } from '@/constants'
import AllRoomsPage from '@/pages/AllRooms'
import ApartmentCreatePage from '@/pages/ApartmentCreate'
import ApartmentSetup from '@/pages/ApartmentSetup'
import Authentication from '@/pages/Authentication'
import MaintenanceCreate from '@/pages/Maintenance/MaintenanceCreate'
import MaintenancePage from '@/pages/Maintenance/MaintenanceTask'
import MonthlyInvoicePage from '@/pages/MonthlyInvoice'
import MonthlyInvoiceCreate from '@/pages/MonthlyInvoiceCreate'
import MonthlyInvoiceDetail from '@/pages/MonthlyInvoiceDetail'
import NormalInvoicePage from '@/pages/NormalInvoice'
import OverdueInvoicePage from '@/pages/OverdueInvoice'
import OverviewPage from '@/pages/Overview'
import ElectricWaterReportPage from '@/pages/Report/ElectricWaterReport'
import ReceiptReport from '@/pages/Report/ReceiptReport'
import RoomReport from '@/pages/Report/RoomReport'
import ServiceInvoicePage from '@/pages/ServiceInvoice'

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
