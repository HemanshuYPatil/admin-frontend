import React, { useEffect, useRef, useState, useContext } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import { DARK_THEME } from "../../../constants/themeConstants";
import { ThemeContext } from "../../../context/ThemeContext";
// import firebase from "firebase/app";
import "firebase/functions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AreaTable.scss";
import {
  MdOutlineAttachMoney,
  MdOutlineBarChart,
  MdOutlineClose,
  MdOutlineCurrencyExchange,
  MdOutlineGridView,
  MdOutlineLogout,
  MdOutlineMessage,
  MdOutlinePeople,
  MdOutlineSettings,
  MdOutlineShoppingBag,
} from "react-icons/md";


const AreaTableAction = ({ userData }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [time, settime] = useState('');
  const navigate = useNavigate();
  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const [appid, setappid] = useState(userData.id);
  const [userDisabled, setUserDisabled] = useState('');
  const dropdownRef = useRef(null);
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };
  const disableUser = async (uid) => {
    try {

      alert("User disabled successfully!");
    } catch (error) {
      // Handle errors
      console.error(error);
      alert("Failed to disable user.");
    }
  };

  const handleViewClicks = () => {
    settime(formatTimestamp(userData.last_active));
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handledisable = () => {
    disableUser(userData.id);
  };

  const handleeditclick = () => {
    const userDataString = JSON.stringify(userData);
    localStorage.setItem('userData', userDataString);
    if (userData.disabled) {
      setShowDropdown(true);
    }
    else {
      navigate('/user/dashboard/edit')
    }
    console.log(userData)
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    const time = date.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })
    return time;
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // corrected removing event listener
    };
  }, []);


  const fetchUserInformation = async () => {
    try {
      const response = await axios.get(`https://admin-backend-w7q6.onrender.com/get-disable/${appid}`);
      setUserDisabled(response.data.disabled);
      console.log(userDisabled);
      console.log(appid);
      if (userDisabled) {
        setShowDropdown(true);
      }
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };

  const handleenable = () => {
    modalRef.current.classList.remove('hidden')
  }

  const enableaccount = async ()  =>  {
    try {
      const response = await axios.post('https://admin-backend-w7q6.onrender.com/enable-user', { userId: appid });
      modalRef.current.classList.add('hidden')
  } catch (error) {
      console.error('Error disabling user account:', error);
      console.log('Failed to disable user account');
  }
  }


  return (
    <>
      <button
        type="button"
        className="action-dropdown-btn"
        onClick={handleeditclick}
      >
        <HiDotsHorizontal size={18} />
        {showDropdown && (
          <div
            className="absolute top-0 right-0 mt-8  z-10 rounded-lg shadow w-44 "
            ref={dropdownRef}
            style={{ backgroundColor: theme === DARK_THEME ? "var( --background-color)" : "#fafafa" }}
          >
            <ul onClick={handleenable} className="py-1 text-sm text-gray-700 dark:text-gray-200 enable-btn" style={{ margin: '5px' }} aria-labelledby="dropdownHoverButton">
              <li>
                <a href="#" className="block px-4 py-2 " style={{ color: theme === DARK_THEME ? "white" : "black" }}>Enable</a>
              </li>

            </ul>
          </div>
        )}
      </button>
      {showModal && (
        <div
          id="crud-modal"
          tabIndex="1"
          aria-hidden="true"
          className={`fixed inset-0 z-50 overflow-y-auto bg-gray-800 bg-opacity-70 flex justify-center items-center`}
        >
          <div className="relative p-4 w-full max-w-md">
            <div style={{ backgroundColor: theme === DARK_THEME ? "var(--secondary-color)" : "#fafafa" }} className="relative  bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 style={{ color: theme === DARK_THEME ? "white" : "black" }} className="text-lg font-semibold text-gray-900">
                  Details
                </h3>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form className="p-4 md:p-5" >
                <div className="grid gap-4 mb-4 grid-cols-2" >
                  <div className="col-span-2">
                    <label htmlFor="name" className="flex mb-2 text-sm font-medium text-gray-900" style={{ color: theme === DARK_THEME ? "white" : "black" }}>
                      UserName
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={userData.name}
                      style={{ backgroundColor: theme === DARK_THEME ? "#272a3f" : "#fafafa", color: theme === DARK_THEME ? "white" : "black" }}
                      disabled
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="name" className="flex mb-2 text-sm font-medium text-gray-900" style={{ color: theme === DARK_THEME ? "white" : "black" }}>
                      Email Address
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      value={userData.email}
                      required=""
                      style={{ backgroundColor: theme === DARK_THEME ? "#272a3f" : "#fafafa", color: theme === DARK_THEME ? "white" : "black" }}
                      disabled
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="name" className="flex mb-2 text-sm font-medium text-gray-900" style={{ color: theme === DARK_THEME ? "white" : "black" }}>
                      User App ID
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      value={userData.id}
                      style={{ backgroundColor: theme === DARK_THEME ? "#272a3f" : "#fafafa", color: theme === DARK_THEME ? "white" : "black" }}
                      required=""
                      disabled
                    />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="name" className="flex mb-2 text-sm font-medium text-gray-900" style={{ color: theme === DARK_THEME ? "white" : "black" }}>
                      Push Token
                    </label>
                    <input
                      type="text"
                      name="name"
                      style={{ backgroundColor: theme === DARK_THEME ? "#272a3f" : "#fafafa", color: theme === DARK_THEME ? "white" : "black", width: '100%', overflowWrap: 'break-word' }}
                      id="name"
                      className="bg-gray-50 cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      value={userData.push_token}
                      required=""
                      disabled

                    />
                  </div>





                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900" style={{ color: theme === DARK_THEME ? "white" : "black" }}>
                      Last Active
                    </label>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      style={{ backgroundColor: theme === DARK_THEME ? "#272a3f" : "#fafafa", color: theme === DARK_THEME ? "white" : "black" }}
                      className="bg-gray-50 border cursor-not-allowed border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      value={time}
                      required=""

                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900" style={{ color: theme === DARK_THEME ? "white" : "black" }}>
                      Joind At
                    </label>
                    <input
                      type="text"
                      style={{ backgroundColor: theme === DARK_THEME ? "#272a3f" : "#fafafa", color: theme === DARK_THEME ? "white" : "black" }}
                      name="price"
                      id="price"
                      className="bg-gray-50 border cursor-not-allowed border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      value={formatTimestamp(userData.created_at)}
                      required=""

                    />
                  </div>




                </div>
                {/* <button
                    type="submit"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    
                    Cancel
                  </button> */}
              </form>
            </div>
          </div>
        </div>
      )}

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
              <h3 style={{ color: theme == DARK_THEME ? "white" : 'black' }} className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to Enable {userData.name} Account?</h3>
              <button onClick={enableaccount} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                Yes, I'm sure
              </button>
              <button onClick={() => {
                modalRef.current.classList.add("hidden");
               
              }} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AreaTableAction;
