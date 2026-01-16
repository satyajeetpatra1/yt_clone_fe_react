import {
  MdHomeFilled,
  MdSubscriptions,
  MdVideoLibrary,
  MdHistory,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const items = [
  { icon: <MdHomeFilled size={24} />, label: "Home", path: "/" },
  { icon: <MdSubscriptions size={24} />, label: "Subscriptions", path: "/" },
  { icon: <MdVideoLibrary size={24} />, label: "Library", path: "/" },
  { icon: <MdHistory size={24} />, label: "History", path: "/" },
];

function Sidebar() {
  const open = useSelector((state) => state.ui.sidebarOpen);

  return (
    <aside
      className={`
        h-screen sticky top-0
        ${open ? "w-56" : "w-20"}
        bg-white dark:bg-black
        border-r dark:border-zinc-800
        transition-all duration-200
      `}
    >
      <nav className="mt-2">
        {items.map((item, i) => (
          <Link
            key={i}
            to={item.path}
            className={`
              flex items-center gap-6
              px-4 py-3
              hover:bg-gray-100 dark:hover:bg-zinc-800
              rounded-lg mx-2
            `}
          >
            <span>{item.icon}</span>
            {open && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
