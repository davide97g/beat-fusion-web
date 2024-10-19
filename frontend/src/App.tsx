import { RouterProvider } from "react-router-dom";

import { AuthProvider } from "./context/AuthProvider";
import { LayoutProvider } from "./context/LayoutProvider";
import { router } from "./router";

function App() {
  return (
    <LayoutProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </LayoutProvider>
  );
}

export default App;
