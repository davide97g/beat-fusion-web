import { useAuth } from "@/hooks/useAuth";
import { AUTH } from "@/services/auth";
import { Button } from "@nextui-org/react";
import { Navigate } from "react-router-dom";

export function Login() {
  const { isLogged } = useAuth();
  if (isLogged) return <Navigate to="/" />;
  return (
    <>
      <h1>Login</h1>
      <Button color="primary" size="md" onClick={AUTH.login}>
        Login
      </Button>
    </>
  );
}
