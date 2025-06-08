import { SuspenseLayout } from '@/components/Layouts/SuspenseLayout';
import { NotFoundPage } from '@/components/NotFoundPage';
import { motion } from 'framer-motion';
import { lazy } from 'react';
import { Route, Routes } from 'react-router';
import { type IRouteDescription, RouteNames } from './routes';

const HomePage = lazy(() => import('@/pages/Home/HomePage'));
const RegistrationPage = lazy(
  () => import('@/pages/Auth/Registration/RegistrationPage'),
);
const EnterPinPage = lazy(() => import('@/pages/Auth/Login/EnterPinPage'));
const LoginPage = lazy(() => import('@/pages/Auth/Login/LoginPage'));
const CodeGeneratedPage = lazy(
  () => import('@/pages/Auth/Registration/components/CodeGenerated'),
);

const { HOME, REGISTRATION, REGISTRATION_CODE, AUTH, AUTH_EMAIL } = RouteNames;

const routes: IRouteDescription[] = [
  {
    path: HOME,
    component: HomePage,
  },
  {
    path: REGISTRATION,
    component: RegistrationPage,
  },
  {
    path: AUTH_EMAIL,
    component: EnterPinPage,
  },
  {
    path: AUTH,
    component: LoginPage,
  },
  {
    path: REGISTRATION_CODE,
    component: CodeGeneratedPage,
  },
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
