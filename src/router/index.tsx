import { createBrowserRouter, RouterProvider, ScrollRestoration } from 'react-router-dom'

import { Layout } from '@/components/layout'
import { ROUTES } from '@/constants'
import MonthlyInvoicePage from '@/pages/MonthlyInvoice'
import NormalInvoicePage from '@/pages/NormalInvoice'
import OverviewPage from '@/pages/Overview'
import RoomReport from '@/pages/Report/RoomReport'

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <ScrollRestoration />
        <Layout />
      </>
    ),
    children: [
      {
        index: true,
        element: <OverviewPage />,
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
        path: ROUTES.normalInvoice.path,
        element: <NormalInvoicePage />,
      },
      {
        path: ROUTES.monthlyInvoice.path,
        element: <MonthlyInvoicePage />,
      },
      {
        path: ROUTES.roomReport.path,
        element: <RoomReport />,
      },
    ],
  },
])

const Router = () => {
  return <RouterProvider router={router} />
}

export default Router
