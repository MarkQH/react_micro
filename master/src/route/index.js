import React, { Suspense, lazy } from 'react';
import { Redirect } from "react-router-dom";
import Home from '@/pages/Home';
const Recommend = lazy (() => import ("@/pages/Recommend/"));
const News = lazy (() => import ("@/pages/News/"));

const SuspenseComponent = Component => props => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  )
}

export default [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => {
          <Redirect to={'/recommend'} />
        }
      },
      {
        path: '/recommend',
        component: SuspenseComponent(Recommend),
        routes: [
          {
            path: "/recommend/:id",
            component: SuspenseComponent(News)
          }
        ]
      }
    ]
  }
]
