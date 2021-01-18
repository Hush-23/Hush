import { Login_Container } from '../containers/Login_Container.js';
import Dashboard from '../containers/Dashboard.jsx';

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
    component: Dashboard
  }
];

export default routes;