import { createBrowserRouter } from "react-router-dom";
import { Root } from "./root";
import { ErrorElement } from "./pages/error";
import { SignIn } from "./pages/sign-in";
import { SignUp } from "./pages/sign-up";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        index: true,
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);
