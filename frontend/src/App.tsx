import { RouterProvider } from "react-router-dom";

import { NextUIProvider } from "@nextui-org/react";
import { Page } from "./components/Page";
import { AuthProvider } from "./context/AuthProvider";
import { LayoutProvider } from "./context/LayoutProvider";
import { router } from "./router";

function App() {
  return (
    <LayoutProvider>
      <AuthProvider>
        <NextUIProvider>
          <main className="purple-dark text-foreground bg-background h-screen w-screen overflow-hidden">
            <Page>
              <RouterProvider router={router} />
            </Page>
          </main>
        </NextUIProvider>
      </AuthProvider>
    </LayoutProvider>
  );
}

export default App;
