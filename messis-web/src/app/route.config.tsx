import {createBrowserRouter} from 'react-router'
import Login from "../views/login/login.view.tsx";

const routeConfig = createBrowserRouter([
  { path: '/login', element: <Login /> },
])

export default routeConfig