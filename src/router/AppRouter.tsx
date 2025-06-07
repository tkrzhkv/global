import { motion } from 'framer-motion';
import { lazy } from 'react';
import { Route, Routes } from 'react-router';
import { SuspenseLayout } from '../components/Layouts/SuspenseLayout';
import { NotFoundPage } from '../components/NotFoundPage';
import { type IRouteDescription, RouteNames } from './routes';

const HomePage = lazy(() => import('../pages/Home/HomePage'));

const { HOME } = RouteNames;

const routes: IRouteDescription[] = [
  {
    path: HOME,
    component: HomePage,
  },
  // {
  //   path: LOGIN,
  //   component: LoginPage,
  // },
];

const routesContent = routes.map(({ path, component: Component }) => (
  <Route key={path} path={path} element={<Component />} />
));

export const AppRouter = () => {
  return (
    <SuspenseLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <Routes>
          {routesContent}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </SuspenseLayout>
  );
};
