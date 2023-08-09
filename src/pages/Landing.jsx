import { useAuth } from "../context/auth-context";
import SignUp1 from "./Signup1";
import Login1 from "./Login1";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const { user, logout } = useAuth();
  console.log("user landing : ", user);

  return user ? (
    <div>
      <header>
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">
                  React Challenge
                </a>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/challenges">Challenges</Link>
                </li>
                <li>
                  <a>Parent</a>
                  <ul className="p-2">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>Item 3</a>
                </li>
              </ul>
            </div>
            {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/challenges">Challenges</Link>
              </li>
              <li tabIndex={0}>
                <details>
                  <summary>Parent</summary>
                  <ul className="p-2">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                {/* <div className="w-10 rounded-full"> */}
                {/* <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
                <div className="flex justify-center items-center bg-neutral-focus text-neutral-content rounded-full w-12">
                  <span>MX</span>
                </div>
                {/* </div> */}
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button className="btn btn-error" onClick={() => logout()}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <div>Hello, {user.name}</div>
      <div>
        List of completed challenges
      </div>
    </div>
  ) : (
    <div className="flex h-[100vh] justify-center items-center">
      <div className="">Landing Page</div>

      {/* The button to open modal */}
      <label htmlFor="my_modal_7" className="btn">
        Signup
      </label>
      <label htmlFor="my_modal_8" className="btn">
        SignIn
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <SignUp1 />
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_8" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <Login1 />
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_8">
          Close
        </label>
      </div>
    </div>
  );
};

export default LandingPage;
