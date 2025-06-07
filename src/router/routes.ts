import type { ComponentType, PropsWithChildren } from 'react';

export enum RouteNames {
  HOME = '/',
  AUTH = '/auth',
  AUTH_EMAIL = '/auth/email',
  REGISTRATION = '/reg',
  REGISTRATION_CODE = '/reg/code',
}

export interface IRouteDescription {
  path: RouteNames;
  component: ComponentType;
  layout?: ComponentType<PropsWithChildren>;
}
