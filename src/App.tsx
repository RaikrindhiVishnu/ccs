import { Suspense, lazy } from "react"
import { Provider } from "react-redux"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { store } from "./app/store"

const Home = lazy(() => import("./pages/Home"))

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
        <Home />
      </Suspense>
    ),
  },
])

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
