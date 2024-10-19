import { RouterProvider } from "react-router-dom";

import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "./context/AuthProvider";
import { LayoutProvider } from "./context/LayoutProvider";
import { router } from "./router";

function App() {
  return (
    <LayoutProvider>
      <AuthProvider>
        <NextUIProvider>
          <main className="purple-dark text-foreground bg-background">
            <RouterProvider router={router} />
          </main>
        </NextUIProvider>
      </AuthProvider>
    </LayoutProvider>
  );
}

export default App;
