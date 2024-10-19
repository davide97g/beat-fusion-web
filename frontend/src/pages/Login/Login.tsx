import { AUTH } from "@/services/auth";
import { Button } from "@nextui-org/react";

export function Login() {
  return (
    <>
      <h1>Login</h1>
      <Button color="primary" size="md" onClick={AUTH.login}>
        Login
      </Button>
    </>
  );
}
