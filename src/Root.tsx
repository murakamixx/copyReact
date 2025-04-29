import { Outlet } from "react-router";
import { FirebaseAuthProvider } from "./providers/FirebaseAuthProvider";
import { FirebaseFirestoreProvider } from "./providers/FirebaseFirestoreProvider";
export const Root = () => {
  return (
    <div>
      <FirebaseAuthProvider>
        <FirebaseFirestoreProvider>
          <Outlet />
        </FirebaseFirestoreProvider>
      </FirebaseAuthProvider>
    </div>
  );
};
