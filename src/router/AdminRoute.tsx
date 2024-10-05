import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    // If not authenticated, redirect to login
    return <Navigate to="/forbidden" />;
  }

  // If authenticated, allow access to the route
  return children;
};

export default AdminRoute;
