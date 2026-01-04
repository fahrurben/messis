import { createBrowserRouter } from "react-router"
import Login from "../views/login/login.view.tsx"
import RootLayout from "./root.layout.tsx"
import Home from "../views/home/home.view.tsx"

const routeConfig = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
    ],
  },
])

export default routeConfig
