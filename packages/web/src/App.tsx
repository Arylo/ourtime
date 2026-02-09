import { Suspense, lazy } from 'react'
import LoadingPage from "./pages/LoadingPage/LoadingPage.tsx"

const AppProvider = lazy(() => import('./components/Provider/AppProvider.tsx'))
const Pages = lazy(() => import('./pages/Page/Pages.tsx'))

export default function App () {
  return <Suspense fallback={<LoadingPage />}>
    <AppProvider>
      <Pages />
    </AppProvider>
  </Suspense>
}
