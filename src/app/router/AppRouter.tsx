import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import AuthGuard from './AuthGuard';
import GuestGuard from './GuestGuard';
import { guestRoutes, authRoutes, publicRoutes } from './routes.definitions';
import { RouteErrorBoundary } from '@/components/common/RouteErrorBoundary';

const PageLoader = () => (
  <div className="flex h-full w-full flex-col p-4 lg:p-6 gap-6 overflow-hidden bg-[#FAFAFA]">
    {/* Header Skeleton */}
    <div className="flex items-center justify-between mb-2">
      <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-md"></div>
      <div className="flex gap-2">
        <div className="hidden md:block h-12 w-[300px] bg-gray-200 animate-pulse rounded-[60px]"></div>
        <div className="h-12 w-12 bg-gray-200 animate-pulse rounded-full"></div>
      </div>
    </div>
    
    {/* Body Skeleton - Generic Grid */}
    <div className="flex flex-col gap-6 flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        <div className="h-[140px] bg-gray-200/80 animate-pulse rounded-[32px]"></div>
        <div className="h-[140px] bg-gray-200/80 animate-pulse rounded-[32px]"></div>
        <div className="h-[140px] bg-gray-200/80 animate-pulse rounded-[32px]"></div>
        <div className="h-[140px] bg-gray-200/80 animate-pulse rounded-[32px]"></div>
      </div>
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        <div className="col-span-2 h-full min-h-[300px] bg-gray-200/80 animate-pulse rounded-[32px]"></div>
        <div className="col-span-1 h-full min-h-[300px] bg-gray-200/80 animate-pulse rounded-[32px]"></div>
      </div>
    </div>
  </div>
);

const wrapWithSuspense = (routes: RouteObject[]): RouteObject[] => {
  return routes.map((route) => {
    const wrappedElement = <Suspense fallback={<PageLoader />}>{route.element}</Suspense>;

    if (route.index) {
      return {
        ...route,
        element: wrappedElement,
      } as RouteObject;
    }

    return {
      ...route,
      element: wrappedElement,
      children: route.children ? wrapWithSuspense(route.children) : undefined,
    } as RouteObject;
  });
};

const router = createBrowserRouter([
  {
    element: <GuestGuard />,
    errorElement: <RouteErrorBoundary />,
    children: wrapWithSuspense(guestRoutes),
  },
  {
    element: <AuthGuard />,
    errorElement: <RouteErrorBoundary />,
    children: wrapWithSuspense(authRoutes),
  },
  ...wrapWithSuspense(publicRoutes).map((route) => ({
    ...route,
    errorElement: <RouteErrorBoundary />,
  })),
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
