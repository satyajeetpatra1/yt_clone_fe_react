import { FaBars, FaMoon, FaSearch, FaSun, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice";
import { toggleSidebar } from "../redux/slices/uiSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../redux/slices/authSlice";

function Header() {
  const dark = useSelector((store) => store.theme.dark);
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) {
      navigate("/");
      return;
    }
    navigate(`/search?q=${query}`);
  };

  return (
    <header className="flex items-center justify-between px-4 h-14 border-b bg-white dark:bg-black w-full">
      {/* Logo & Title */}
      <div className="flex items-center gap-4">
        <FaBars
          size={22}
          className="cursor-pointer hidden md:block"
          onClick={() => dispatch(toggleSidebar())}
        />
        <span className="font-bold text-lg">YouTube</span>
      </div>

      {/* Center Search */}
      <div className="md:flex items-center w-1/2 hidden">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1 px-4 py-1 border border-gray-300 dark:border-zinc-700 rounded-l-full bg-transparent focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 border border-l-0 border-gray-300 dark:border-zinc-700 rounded-r-full
               bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700"
        >
          <FaSearch />
        </button>
      </div>

      <div className="flex items-center gap-4 relative">
        {/* toggle theme */}
        <button onClick={() => dispatch(toggleTheme())}>
          {dark ? <FaSun /> : <FaMoon />}
        </button>

        {/* Sign In */}
        {user ? (
          <div className="relative">
            <img
              src={
                user.avatar ||
                "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
              }
              alt="profile"
              className="w-8 h-8 rounded-full cursor-pointer bg-white"
              onClick={() => setOpen(!open)}
            />

            {open && (
              <div className="absolute z-50 right-0 top-10 w-40 bg-white dark:bg-zinc-800 shadow rounded">
                <p className="px-4 py-2 font-semibold">{user.username}</p>
                <hr />
                <Link
                  to={`/my-channel`}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700"
                >
                  Your Channel
                </Link>
                <button
                  onClick={() => dispatch(logout())}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to={"/login"}
            className="flex items-center gap-2 px-4 py-1 border bg-transparent rounded-full dark:text-white text-blue-600 hover:bg-blue-50 border-gray-600 dark:hover:bg-gray-600 cursor-pointer"
          >
            <FaUserCircle size={20} />
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
