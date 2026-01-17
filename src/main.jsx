import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { Toaster } from "react-hot-toast";
import Loading from "./components/Loading.jsx";

// lazy loading pages
const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Watch = lazy(() => import("./pages/Watch.jsx"));
const Channel = lazy(() => import("./pages/Channel.jsx"));
const MyChannel = lazy(() => import("./pages/MyChannel.jsx"));
const Search = lazy(() => import("./pages/Search.jsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <Suspense fallback={<Loading />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "watch/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <Watch />
          </Suspense>
        ),
      },
      {
        path: "my-channel",
        element: (
          <Suspense fallback={<Loading />}>
            <MyChannel />
          </Suspense>
        ),
      },
      {
        path: "channel/:channelId",
        element: (
          <Suspense fallback={<Loading />}>
            <Channel />
          </Suspense>
        ),
      },
      {
        path: "search",
        element: (
          <Suspense fallback={<Loading />}>
            <Search />
          </Suspense>
        ),
      },
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
