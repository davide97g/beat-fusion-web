import { useAuth } from "@/hooks/useAuth";
import { AUTH } from "@/services/auth";
import { Button, User } from "@nextui-org/react";

export function PersonalArea() {
  const { user } = useAuth();
  return (
    <div>
      <h1>PersonalArea</h1>
      <User
        avatarProps={{
          src: user?.photoURL,
        }}
        description={user?.email}
        name={user?.username}
      />
      <Button color="danger" variant="solid" onClick={AUTH.logout}>
        Logout
      </Button>
    </div>
  );
}
