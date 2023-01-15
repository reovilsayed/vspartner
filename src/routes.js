import React from "react";

const routes = [
    {
        path: '/',
        component: React.lazy(() => import('./Pages/Home')),
        layout: 'default',
        protected: true,
    },
    {
        path: '/my-videos',
        component: React.lazy(() => import('./Pages/Videos/Videos')),
        layout: 'default',
        protected: true,
    },
    {
        path: '/my-earnings',
        component: React.lazy(() => import('./Pages/MyEearning')),
        layout: 'default',
        protected: true,
    },
    {
        path: '/my-messages',
        component: React.lazy(() => import('./Pages/MyMessages')),
        layout: 'default',
        protected: true,
    },
    {
        path: '/notification',
        component: React.lazy(() => import('./Pages/Notifications')),
        layout: 'default',
        protected: true,
    },
    {
        path: '/setting',
        component: React.lazy(() => import('./Pages/Setting')),
        layout: 'default',
        protected: true,
    },
    {
        path: '/chat-details/:id',
        component: React.lazy(() => import('./Pages/Chat')),
        layout: 'detail',
        protected: true,
    }
]

export default routes;