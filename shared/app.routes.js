import HomePage from './pages/home';
import CityPage from './pages/city';
import NotFoundPage from './pages/not-found.page';

const AppRoutes = [
  {
    path: '/city/:name',
    component: CityPage,
  },
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  {
    path: '*',
    restricted: false,
    component: NotFoundPage
  },
];

export default AppRoutes;
