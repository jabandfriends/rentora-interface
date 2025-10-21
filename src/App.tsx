import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'

import Router from './router'

const queryClient: QueryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" reverseOrder={true} />
      <Router />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
