import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageWrapper from "./components/PageWrapper/PageWrapper";
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
