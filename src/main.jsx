import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";
import { AuthContextProvider } from "./features/auth/context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <h1>Refleks Reports</h1>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  </StrictMode>
);
