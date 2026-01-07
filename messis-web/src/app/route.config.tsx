import { createBrowserRouter } from "react-router"
import Login from "../views/login/login.view.tsx"
import RootLayout from "./root.layout.tsx"
import Home from "../views/home/home.view.tsx"
import MainLayout from "./main.layout.tsx"
import ProfileView from "../views/profile/profile.view.tsx"

const routeConfig = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/login", element: <Login /> },
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/profile", element: <ProfileView /> },
        ],
      },
    ],
  },
])

export default routeConfig
