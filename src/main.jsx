import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 5000 }}
      />
    </StrictMode>
  </Provider>
);
