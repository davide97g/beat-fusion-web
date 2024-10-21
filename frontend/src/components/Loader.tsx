import { Spinner } from "@nextui-org/react";

export function Loader() {
  return (
    <div className="absolute top-0 left-0">
      <div className="flex items-center justify-center h-screen w-screen backdrop-blur-sm">
        <Spinner size="lg" />
      </div>
    </div>
  );
}
