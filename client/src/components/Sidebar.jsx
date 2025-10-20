import {
  FaCarCrash,
  FaHome,
  FaSignOutAlt,
  FaUsers
} from "react-icons/fa";
import { useDispatch } from "react-redux";

import { NavLink, useLocation } from "react-router-dom";
import { logout } from "../redux/Auth/Auth";

const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <div className="h-full w-16 lg:w-64 bg-white flex flex-col border-r border-gray-200">
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        {/* Logo */}
        <span className="text-2xl font-semibold">
          <h2 className="hidden lg:block">StockMate</h2>
          <h4 className="lg:hidden">S</h4>
        </span>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6">
        <ul className="space-y-2">
          <SidebarItem icon={FaHome} text="Home" href="/dashboard" />
          <SidebarItem icon={FaUsers} text="Users" href="/dashboard/user" />
          <SidebarItem icon={FaCarCrash} text="Accounts" href="/dashboard/account" />
        </ul>
      </nav>
      <div className="flex items-center justify-center lg:justify-start p-4 border-t border-gray-200">
        <button
          onClick={() => dispatch(logout())}
          className="flex items-center justify-center text-gray-600 hover:text-gray-800"
        >
          <FaSignOutAlt className={"lg:mr-2 text-lg"} />
          <span className="hidden lg:block">Logout</span>
        </button>
      </div>
    </div>
  );
};

const SidebarItem = ({ href, text, icon: Icon }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <li>
      <NavLink
        to={href}
        className={`flex items-center gap-3 lg:gap-4 px-4 py-2.5 rounded-lg font-inter font-medium transition-all duration-200 
          ${
            isActive
              ? "bg-primary/10 text-primary shadow-sm"
              : "text-gray-700 hover:bg-gray-100"
          }
        `}
      >
        <Icon
          className={`text-xl ${
            isActive ? "text-primary" : "text-gray-500"
          } transition-colors duration-200`}
        />
        <span className="hidden lg:inline">{text}</span>
      </NavLink>
    </li>
  );
};

export default Sidebar;
