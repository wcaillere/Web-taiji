import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageWrapper from "./components/PageWrapper/PageWrapper";
import HomePage from "./pages/HomePage/HomePage";
import PuzzlePage from "./pages/PuzzlePage/PuzzlePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PageWrapper />,
      children: [
        {
          path: "/puzzle",
          element: <PuzzlePage />,
        },
        {
          path: "/",
          element: <HomePage />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
