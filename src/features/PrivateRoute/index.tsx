import { Navigate } from "react-router";
import { useFirebaseAuth } from "../../providers/FirebaseAuthProvider";
import { PropsWithChildren } from "react";

export const PrivateRoute = ({ children }: PropsWithChildren) => {
  const { authData, isAuthenticating } = useFirebaseAuth();

  if (isAuthenticating) {
    return null;
  }

  if (!authData && !isAuthenticating) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};
