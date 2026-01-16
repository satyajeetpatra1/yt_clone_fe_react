import { MdHomeFilled, MdSubscriptions, MdVideoLibrary } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

function MobileBottomNav() {
  const { pathname } = useLocation();

  const items = [
    { icon: <MdHomeFilled size={24} />, label: "Home", path: "/" },
    {
      icon: <MdSubscriptions size={24} />,
      label: "Subs",
      path: "/subscriptions",
    },
    { icon: <MdVideoLibrary size={24} />, label: "Library", path: "/library" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black
      border-t flex justify-around py-2 md:hidden z-50"
    >
      {items.map((item) => {
        const active = pathname === item.path;

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center text-xs
              ${active ? "text-red-600" : ""}`}
          >
            {item.icon}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default MobileBottomNav;
