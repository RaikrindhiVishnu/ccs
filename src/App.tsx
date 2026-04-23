import { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { store } from "./app/store";

const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));

const loader = (
  <div className="flex min-h-screen items-center justify-center">
    Loading...
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={loader}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={loader}>
        <Home />
      </Suspense>
    ),
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;