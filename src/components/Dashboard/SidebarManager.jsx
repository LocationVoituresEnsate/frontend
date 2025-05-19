import { FaUserFriends, FaUsers, FaCar, FaRegCalendarAlt, FaChartLine, FaClipboardList } from "react-icons/fa";
import { MdOutlineManageAccounts } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const SidebarManager = () => {
  const linkClass = ({ isActive }) => 
    isActive 
      ? "flex flex-row items-center space-x-3 text-fuchsia font-semibold py-2 px-4 bg-primary/30 rounded-md" 
      : "flex flex-row items-center space-x-3 text-text hover:text-fuchsia transition-colors duration-200 py-2 px-4";

  return (
    <div className="w-64 min-h-screen flex flex-col border-r-2 border-gray-100 bg-white px-4 py-8">
      {/* En-tête de la sidebar */}
      <div className="mb-8 flex items-center justify-center flex-col">
        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-fuchsia mb-3">
          <FaUserCircle size={50} />
        </div>
        <h2 className="font-bold text-text">Dashboard Manager</h2>
        <div className="mt-1 text-xs text-gray-500">Espace administration</div>
      </div>
      
      {/* Navigation */}
      <div className="flex flex-col space-y-1">
        <NavLink end to="/manager" className={linkClass}>
          <FaChartLine size={18} />
          <span>Dashboard</span>
        </NavLink>
        
        <div className="border-t border-gray-100 my-3 pt-2">
          <div className="text-xs text-gray-400 uppercase font-medium px-4 mb-2">Gestion</div>
        </div>

        <NavLink to="/manager/clients" className={linkClass}>
          <FaUserFriends size={18} />
          <span>Gestion des clients</span>
        </NavLink>

        <NavLink to="/manager/voitures" className={linkClass}>
          <FaCar size={18} />
          <span>Gestion des voitures</span>
        </NavLink>

        <NavLink to="/manager/reservations" className={linkClass}>
          <FaRegCalendarAlt size={18} />
          <span>Gestion des réservations</span>
        </NavLink>
        
        <div className="border-t border-gray-100 my-3 pt-2">
          <div className="text-xs text-gray-400 uppercase font-medium px-4 mb-2">Administration</div>
        </div>
        
        <NavLink to="/manager/rapports" className={linkClass}>
          <FaClipboardList size={18} />
          <span>Rapports</span>
        </NavLink>

        <NavLink to="/manager/parametres" className={linkClass}>
          <MdOutlineManageAccounts size={20} />
          <span>Paramètres</span>
        </NavLink>
      </div>
      
      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-gray-100">
        <div className="relative inline-block px-4 py-3 w-full">
          <span className="text-fuchsia text-sm font-medium">LocationVoitures</span>
          <svg className="absolute bottom-2 left-4 w-24" height="2" viewBox="0 0 100 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 1H100" stroke="#D4006D" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="text-xs text-gray-400 px-4">Version 1.0</div>
      </div>
    </div>
  );
};

export default SidebarManager;