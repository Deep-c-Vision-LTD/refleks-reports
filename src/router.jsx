import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Dashboard from "./features/dashboard/Dashboard";
import Signin from "./features/auth/Signin";

export const router = createBrowserRouter([
  { path: "/refleks-reports/", element: <App /> },
  { path: "/efleks-reports/dashboard", element: <Dashboard /> },
]);
