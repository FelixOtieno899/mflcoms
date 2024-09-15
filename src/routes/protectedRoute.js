import { createWebHistory, createRouter } from 'vue-router';
import adminRoutes from './AdminRoutes';
import authRoutes from './authRoutes';
import store from '@/vuex/store';

const routes = [
  {
    name: 'Admin',
    path: '/',
    component: () => import(/* webpackChunkName: "admin" */ '@/layout/withAdminLayout.vue'),
    children: [...adminRoutes],
    meta: { auth: true }, // Mark as requiring authentication
  },
  {
    name: 'Auth',
    path: '/auth',
    component: () => import(/* webpackChunkName: "auth" */ '@/layout/withAuthLayout.vue'),
    children: [...authRoutes],
    meta: { auth: false }, // Public routes (no auth required)
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  linkExactActiveClass: 'active',
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.auth.accessToken; // Check if accessToken exists

  console.log('Navigating to:', to);
  console.log('Is Authenticated:', isAuthenticated);

  if (to.meta.auth && !isAuthenticated) {
    // If the route requires auth and the user is not authenticated, redirect to login
    next({ name: 'login' });
  } else if (!to.meta.auth && isAuthenticated) {
    // If the route does not require auth but the user is authenticated, redirect to home
    next({ path: '/' });
  } else {
    // Proceed to the route
    next();
  }

  window.scrollTo(0, 0); // reset scroll position to top of page
});

export default router;



// import { createWebHistory, createRouter } from 'vue-router';
// import adminRoutes from './AdminRoutes';
// import authRoutes from './authRoutes';
// import store from '@/vuex/store';

// const routes = [
//   {
//     name: 'Admin',
//     path: '/',
//     component: () => import(/* webpackChunkName: "admin" */ '@/layout/withAdminLayout.vue'),
//     children: [...adminRoutes],
//     meta: { auth: false },
//   },
//   {
//     name: 'Auth',
//     path: '/auth',
//     component: () => import(/* webpackChunkName: "auth" */ '@/layout/withAuthLayout.vue'),
//     children: [...authRoutes],
//     meta: { auth: true },
//   },
// ];

// const router = createRouter({
//   // history: createWebHistory(process.env.VUE_APP_BASE_URL || '/'),
//   history: createWebHistory('/'),
//   linkExactActiveClass: 'active',
//   routes,
// });

// router.beforeEach((to, from, next) => {
//   // Check authentication before each route change
//   if (to.meta.auth && store.state.auth.login) {
//     next({ path: '/' });
//   } else if (!to.meta.auth && !store.state.auth.login) {
//     next({ name: 'login' });
//   } else {
//     next();
//   }
//   window.scrollTo(0, 0); // reset scroll position to top of page
// });

// export default router;
