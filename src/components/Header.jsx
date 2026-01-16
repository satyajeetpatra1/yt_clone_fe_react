import { FaBars, FaMoon, FaSearch, FaSun, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice";
import { toggleSidebar } from "../redux/slices/uiSlice";
import { Link } from "react-router-dom";

function Header() {
  const dark = useSelector((store) => store.theme.dark);
  const dispatch = useDispatch();

  return (
    <header className="flex items-center justify-between px-4 h-14 border-b bg-white dark:bg-black w-full">
      {/* Logo & Title */}
      <div className="flex items-center gap-4">
        <FaBars
          size={22}
          className="cursor-pointer"
          onClick={() => dispatch(toggleSidebar())}
        />
        <span className="font-bold text-lg">YouTube</span>
      </div>

      {/* Center Search */}
      <div className="flex items-center w-1/2">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 px-4 py-1 border border-gray-300 dark:border-zinc-700 rounded-l-full bg-transparent focus:outline-none"
        />
        <button
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
        <Link to={"/login"} className="flex items-center gap-2 px-4 py-1 border bg-transparent rounded-full dark:text-white text-blue-600 hover:bg-blue-50 border-gray-600 dark:hover:bg-gray-600 cursor-pointer">
          <FaUserCircle size={20} />
          Sign in
        </Link>
      </div>
    </header>
  );
}

export default Header;
