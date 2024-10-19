import { ReactNode } from "react";

export function Page({ children }: Readonly<{ children?: ReactNode }>) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full w-full">
      {children}
    </div>
  );
}
