import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';
import Login from '@/pages/Login/Login';
import Logout from '@/pages/Logout/Logout';

import TokenExpire from '@/pages/Token/Expire';

import ErrorPage from '@/pages/Error/Error';
// Core
import TypographyPage from '@/pages/Typography/Typography';

// Tables
import TablesBasicPage from '@/pages/Tables/Basic';

// Maps
import GoogleMapPage from '@/pages/Maps/Google';

// Main
import AnalyticsPage from '@/pages/Dashboard/Dashboard';

// Charts
/*import ChartsPage from '@/pages/Charts/Charts';*/

// Ui
import IconsPage from '@/pages/Icons/Icons';
import NotificationsPage from '@/pages/Notifications/Notifications';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/app'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/token/expire',
      name: 'token_expire',
      component: TokenExpire,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/error',
      name: 'Error',
      component: ErrorPage,
    },
    {
      path: '/app',
      name: 'Layout',
      component: Layout,
      redirect: '/app/dashboard',
      meta: {
        requiredAuth: true
      },
      children: [
        {
          path: 'dashboard',
          name: 'AnalyticsPage',
          component: AnalyticsPage,
        },
        {
          path: 'typography',
          name: 'TypographyPage',
          component: TypographyPage,
        },
        {
          path: 'components/icons',
          name: 'IconsPage',
          component: IconsPage,
        },
        {
          path: 'notifications',
          name: 'NotificationsPage',
          component: NotificationsPage,
        },
        /*{
          path: 'components/charts',
          name: 'ChartsPage',
          component: ChartsPage,
        },*/
        {
          path: 'tables',
          name: 'TablesBasicPage',
          component: TablesBasicPage,
        },
        {
          path: 'components/maps',
          name: 'GoogleMapPage',
          component: GoogleMapPage,
        },
      ],
    },
  ],
});
