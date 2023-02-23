import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PuzzlePage from "./pages/PuzzlePage/PuzzlePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/puzzle",
      element: <PuzzlePage />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
