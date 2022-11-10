import React, { lazy, FC } from 'react';

import Training from '@pages/training';
import LoginPage from '@/pages/login';
import LayoutPage from '@/pages/layout';
import WrapperRouteComponent from './config';
import { useRoutes, RouteObject } from 'react-router-dom';
import Dashboard from '@/pages/dashboard';
import Overview from '@/pages/dashboard/overview';

const NotFound = lazy(() => import('@/pages/404'));

const routeList: RouteObject[] = [
  {
    path: '/',
    element: (
      <WrapperRouteComponent auth={true}>
        <LayoutPage />
      </WrapperRouteComponent>
    ),
    children: [
      {
        path: '/training',
        element: (
          <WrapperRouteComponent>
            <Training />
          </WrapperRouteComponent>
        ),
      },
      {
        path: '/overview',
        element: (
          <WrapperRouteComponent>
            <Overview />
          </WrapperRouteComponent>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <WrapperRouteComponent>
            <Dashboard />
          </WrapperRouteComponent>
        ),
      },
      {
        path: '*',
        element: (
          <WrapperRouteComponent>
            <NotFound />
          </WrapperRouteComponent>
        ),
      },
    ],
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
