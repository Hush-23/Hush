import { Login_Container } from '../containers/Login_Container.js';
import { Dashboard_Container } from '../containers/Dashboard_Container.js';

/**
 * Routes used in App component
 * can be routed to login page or dashboard page
 */

const routes = [
  {
    path: '/login',
    component: Login_Container
  },
  {
    path: '/dashboard',
    component: Dashboard_Container
  }
];

export default routes;