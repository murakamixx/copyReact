import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { Home } from "./features/HomePage/Home";
import { Services } from "./features/ServicesPage/Services";
import { Rooms } from "./features/RoomsPage/Rooms";
import { Profile } from "./features/ProfilePage/Profile";
import { PageNotFound } from "./features/404";
import { SignIn } from "./features/SignInPage";
import { PrivateRoute } from "./features/PrivateRoute";
import { SignUp } from "./features/SignUpPage";
import { ResetPassword } from "./features/ResetPasswordPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { path: "/", element: <Home />, index: true },
      { path: "/services", element: <Services /> },
      { path: "/rooms", element: <Rooms /> },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/resetpassword", element: <ResetPassword /> },
      { path: "/pageNotFound", element: <PageNotFound /> },
    ],
  },
]);
