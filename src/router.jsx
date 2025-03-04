import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Dashboard from "./features/dashboard/Dashboard";
import Signin from "./features/auth/Signin";

export const router = createBrowserRouter(
  [
    { path: "/", element: <App /> },
    { path: "/dashboard", element: <Dashboard /> },
  ],
  {
    basename: "/refleks-reports",
  }
);
