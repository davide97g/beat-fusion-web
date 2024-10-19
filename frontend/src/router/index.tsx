import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

const PersonalArea = lazy(() => import("../pages/PersonalArea"));
const Fusions = lazy(() => import("../pages/Fusions"));
const Fusion = lazy(() => import("../pages/Fusion"));

const Login = lazy(() => import("../pages/Login"));
const Forbidden = lazy(() => import("../pages/Forbidden"));
const NotFound = lazy(() => import("../pages/NotFound"));

export const router = createBrowserRouter([
  {
    path: "/Fusions",
    element: (
      <Suspense>
        <ProtectedRoute>
          <Fusions />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/fusion/:fusionId",
    element: (
      <Suspense>
        <Fusion />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/me",
    element: (
      <Suspense>
        <ProtectedRoute>
          <PersonalArea />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/forbidden",
    element: (
      <Suspense>
        <ProtectedRoute>
          <Forbidden />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense>
        <NotFound />
      </Suspense>
    ),
  },
]);