import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

import Router from './router'

const queryClient: QueryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" reverseOrder={true} />
      <Router />
    </QueryClientProvider>
  )
}

export default App
