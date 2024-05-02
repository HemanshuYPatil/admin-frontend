import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME, DARK_THEME } from "../../constants/themeConstants";
import LogoBlue from "../../assets/images/logo_blue.svg";
import LogoWhite from "../../assets/images/logo_white.svg";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineAttachMoney,
  MdOutlineBarChart,
  MdOutlineClose,
  MdOutlineCurrencyExchange,
  MdOutlineGridView,
  MdOutlineLogout,
  MdOutlineMessage,
  MdOutlinePeople,
  MdOutlinePerson,
  MdOutlineSettings,
  MdOutlineShoppingBag,
} from "react-icons/md";
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import { SidebarContext } from "../../context/SidebarContext";
import { FaRegUser } from "react-icons/fa";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const logged = localStorage.getItem('logged-user');
  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-oepn-btn"
    ) {
      closeSidebar();
    }
  };

  const handleLogoutConfirmation = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
      <div className="sidebar-top">
        <div className="sidebar-brand">
          {/* <img src={theme === LIGHT_THEME ? LogoBlue : LogoWhite} alt="" /> */}
          <span className="sidebar-brand-text">ChatBuddy Admin </span>
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="dashboard" className={`menu-link ${location.pathname === '/user/dashboard' ? 'active' : ''}`}>
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Dashboard</span>
              </Link>
            </li>
            {/* <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlinePeople size={20} />
                </span>
                <span className="menu-link-text">Groups</span>
              </Link>
            </li> */}
            <li className="menu-item">
              <Link to="order" className={`menu-link ${location.pathname === '/user/order' || location.pathname === '/user/order/orders' ? 'active' : ''}`}>
                <span className="menu-link-icon">
                  <MdOutlineShoppingBag size={20} />
                </span>
                <span className="menu-link-text">Orders</span>
              </Link>
            </li>

            <li className="menu-item">
              <Link to="request" className={`menu-link ${location.pathname === '/user/request' ? 'active' : ''}`}>
                <span className="menu-link-icon">
                  <MdOutlinePeople size={18} />
                </span>
                <span className="menu-link-text">Request</span>
              </Link>
            </li>

            <li className="menu-item">
              <Link to="trancation" className={`menu-link ${location.pathname === '/user/trancation' ? 'active' : ''}`}>
                <span className="menu-link-icon">
                  <MdOutlineCurrencyExchange size={18} />
                </span>
                <span className="menu-link-text">Transactions</span>
              </Link>
            </li>

          </ul>
        </div>
        <div id="tooltip-animation" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
          Tooltip content
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item">
              <div className="tooltip-container" data-tooltip-target="tooltip-user">
                <Link to="#" className={`menu-link ${location.pathname === '/user/setting' ? 'active' : ''}`}>
                  <span className="menu-link-icon">
                    <MdOutlinePerson size={20} />
                  </span>
                  <span className="menu-link-text">{logged}</span>
                </Link>
                {/* <div id="tooltip-user" role="tooltip" className="tooltip dark:bg-gray-700">
                  Tooltip content
                </div> */}
              </div>
            </li>
            <li className="menu-item">
              <Link to="#" className="menu-link" onClick={() => {
                modalRef.current.classList.remove("hidden");
              }}>
                <span className="menu-link-icon">
                  <MdOutlineLogout size={20} />
                </span>
                <span className="menu-link-text">Logout</span>
              </Link>
            </li>


          </ul>
        </div>

        <div
          id="popup-modal"
          ref={modalRef}
          tabIndex="-1"
          className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-90"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div style={{ backgroundColor: theme === DARK_THEME ? " var(--secondary-color)" : "#fafafa", }} className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button onClick={() => { modalRef.current.classList.add("hidden"); }} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                <MdOutlineClose size={18} />
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <h3 style={{ color: theme == DARK_THEME ? "white" : 'black' }} className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                <button data-modal-hide="popup-modal" type="button" onClick={handleLogoutConfirmation} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                  Yes, I'm sure
                </button>
                <button onClick={() => {
                  modalRef.current.classList.add("hidden");
                }} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
              </div>
            </div>
          </div>
        </div>


      </div >

    </nav >
  );
};

export default Sidebar;
