import { FC, PropsWithChildren } from 'react';

import { Navigate } from 'react-router-dom';

import { useAuth } from '../../store/auth/useAuth';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PrivateRouteProps {}

export const PrivateRoute: FC<PropsWithChildren<PrivateRouteProps>> = ({
  children,
}) => {
  const auth = useAuth();

  if (!auth.isLoggedIn) {
    return <Navigate replace={true} to="/sign-in" />;
  }

  return <div>{children}</div>;
};
