import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import { Topbar } from "@/components/Topbar";

const PersonalArea = lazy(() => import("../pages/PersonalArea"));
const Songs = lazy(() => import("../pages/Songs"));
const Fusions = lazy(() => import("../pages/Fusions"));
const FusionAdd = lazy(() => import("../pages/FusionAdd"));
const Fusion = lazy(() => import("../pages/Fusion"));
const AddSong = lazy(() => import("../pages/Create"));

const Login = lazy(() => import("../pages/Login"));
const Forbidden = lazy(() => import("../pages/Forbidden"));
const NotFound = lazy(() => import("../pages/NotFound"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <ProtectedRoute>
          <Topbar />
          <Fusions />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/fusions",
    element: (
      <Suspense>
        <ProtectedRoute>
          <Topbar />
          <Fusions />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/fusion/add",
    element: (
      <Suspense>
        <ProtectedRoute>
          <Topbar />
          <FusionAdd />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/songs",
    element: (
      <Suspense>
        <ProtectedRoute>
          <Topbar />
          <Songs />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/song/add",
    element: (
      <Suspense>
        <ProtectedRoute>
          <Topbar />
          <AddSong />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/fusion/:fusionId",
    element: (
      <Suspense>
        <Topbar />
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
          <Topbar />
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
