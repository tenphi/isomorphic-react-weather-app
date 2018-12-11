import HomePage from './pages/home.page';
import CityPage from './pages/city.page';
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
