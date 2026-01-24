import { Outlet, useNavigate } from "react-router"
import { Link } from "react-router"
import { actions as authActions } from "../stores/auth.store.ts"

const MainLayout = () => {
  const navigate = useNavigate()

  const logoutHandle = () => {
    navigate("/login")
    authActions.removeToken()
  }

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm flex justify-center">
        <div className="flex flex-1 justify-between max-w-7xl">
          <div className="flex">
            <Link to="/" className="btn btn-ghost text-xl">
              Messis
            </Link>
          </div>
          <div className="flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/">Time Entry</Link>
              </li>
              <li>
                <Link to="/projects">Project</Link>
              </li>
              <li>
                <a>Teams</a>
              </li>
            </ul>
          </div>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={() => logoutHandle()}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-8">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
