import { createBrowserRouter } from "react-router-dom";

import Dashboard from "./features/dashboard/Dashboard";
import Signin from "./features/auth/Signin";

export const router = createBrowserRouter(
  [
    { path: "/", element: <Signin /> },
    { path: "/dashboard", element: <Dashboard /> },
  ],
  {
    basename: "/refleks-reports",
  }
);
