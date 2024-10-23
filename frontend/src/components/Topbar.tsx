import { useAuth } from "@/hooks/useAuth";
import {
  Activity,
  Add,
  ChevronDown,
  Flash,
  List,
  Locked,
  Scale,
  ServerDns,
  User,
} from "@carbon/icons-react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";

export function Topbar() {
  const { isLogged, user } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname);
  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    scale: <Scale className="text-warning" fill="currentColor" size={30} />,
    lock: <Locked className="text-success" fill="currentColor" size={30} />,
    activity: (
      <Activity className="text-secondary" fill="currentColor" size={30} />
    ),
    flash: <Flash className="text-primary" fill="currentColor" size={30} />,
    server: (
      <ServerDns className="text-success" fill="currentColor" size={30} />
    ),
    user: <User className="text-danger" fill="currentColor" size={30} />,
  };

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">BeatFlow</p>
      </NavbarBrand>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <Dropdown>
          <NavbarItem isActive={pathname.includes("song")}>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                Songs
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Add new song"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="song-list"
              startContent={<List />}
              onClick={() => navigate("/songs")}
            >
              My Songs
            </DropdownItem>
            <DropdownItem
              key="add-song"
              startContent={<Add />}
              onClick={() => navigate("/song/add")}
            >
              Add New Song
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <NavbarItem isActive={pathname.includes("fusion")}>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                Fusions
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Add new fusion"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="fusion-list"
              startContent={<List />}
              onClick={() => navigate("/fusions")}
            >
              My Fusions
            </DropdownItem>
            <DropdownItem
              key="add-fusion"
              startContent={<Add />}
              onClick={() => navigate("/fusion/add")}
            >
              Add New Fusion
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {!isLogged ? (
            <Button as={Link} color="primary" href="#" variant="flat">
              Log in
            </Button>
          ) : (
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={user?.username}
              size="sm"
              src={user?.photoURL}
              onClick={() => navigate("/me")}
            />
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
