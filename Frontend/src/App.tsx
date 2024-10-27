import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import BreedDetails from "./components/BreedDetails";
import ErrorPage from "./components/ErrorPage";
import GlobalContextProvider from "./context/GlobalContext";
import ErrorBoundary from "./components/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:breed",
    element: <BreedDetails />,
  },
]);

function App() {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <GlobalContextProvider>
          <RouterProvider router={router} />
        </GlobalContextProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

export default App;
