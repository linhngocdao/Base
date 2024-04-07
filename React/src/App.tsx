import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {Suspense, lazy} from "react"
import {Route, Routes} from "react-router-dom"
import {adminRoutes, clientRoutes} from "./routes"


const AdminLayout = lazy(() => import('~/layouts/admin'));
const ClientLayout = lazy(() => import('~/layouts/client'));
const Product = lazy(() => import('~/pages/client/product/product'));
const Dashboard = lazy(() => import('~/pages/admin/dashboard/dashboard'));

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 24 * 3600 * 1000,  // cache for 1 day
        retry: false,
      },
    }
  })
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<ClientLayout/>}>
          <Route index element={<Product/>}/>
          {clientRoutes.map((route, index) => {
            const {path, component: Component} = route;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<div>Loading ...</div>}>
                    <Component/>
                  </Suspense>
                }
              />
            );
          })}
        </Route>
        <Route path='admin' element={<AdminLayout/>}>
          <Route index element={<Dashboard/>}/>
          {adminRoutes.map((route, index) => {
            const {path, component: Component} = route;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<div>Loading ...</div>}>
                    <Component/>
                  </Suspense>
                }
              />
            )
          })}
        </Route>
      </Routes>
    </QueryClientProvider>
  )
}

export default App
