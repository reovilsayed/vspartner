import React from "react";

const routes = [
    {
        path: '/',
        component: React.lazy(() => import('./routes/Home')),
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
        component: React.lazy(() => import('./routes/MyEearning')),
        layout: 'default',
        protected: true,
    },
    {
        path: '/my-messages',
        component: React.lazy(() => import('./routes/MyMessages')),
        layout: 'default',
        protected: true,
    },
    {
        path: '/notification',
        component: React.lazy(() => import('./routes/Notifications')),
        layout: 'default',
        protected: true,
    },
    {
        path: '/setting',
        component: React.lazy(() => import('./routes/Setting')),
        layout: 'default',
        protected: true,
    },
    {
        path: '/chat-details/:id',
        component: React.lazy(() => import('./routes/Chat')),
        layout: 'detail',
        protected: true,
    }
]

export default routes;