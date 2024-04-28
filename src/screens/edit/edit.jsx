import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { DARK_THEME } from "../../constants/themeConstants";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { db } from "../../api/config";

const Edituser = () => {

    const formatTimestamp = (timestamp) => {
        const date = new Date(parseInt(timestamp));
        const time = date.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })
        return time;
    };

    const originalstamp = (timestamp) => {
        const timeInMilliseconds = new Date(timestamp).getTime();
        return timeInMilliseconds;
    };

    const { theme } = useContext(ThemeContext);
    const storedUserData = localStorage.getItem('userData');

    const userData = JSON.parse(storedUserData);
    const modalRef = useRef(null);
    const deleteref = useRef(null);
    const [name, setName] = useState(userData.name);
    const [email, setemail] = useState(userData.email);
    const [appid, setappid] = useState(userData.id);
    const [token, settoken] = useState(userData.push_token);
    const [about, setabout] = useState(userData.about);
    const [createdat, setcreatedat] = useState(formatTimestamp(userData.created_at));
    const [active, setactive] = useState(formatTimestamp(userData.last_active));
    const [alert, setalert] = useState('');
    const navigate = useNavigate();
    const [userDisabled, setUserDisabled] = useState('');
    console.log(userDisabled);

    const collectionName = 'users';
    const documentId = userData.id;
    const updatedFields = {
      disable: true
    };
    useEffect(() => {
        const fetchUserInformation = async () => {
            try {
                const response = await axios.get(`https://admin-backend-w7q6.onrender.com/get-user/${appid}`);
                setUserDisabled(response.data.disabled);
                console.log(userDisabled);

            } catch (error) {
                console.error('Error fetching user information:', error);
            }
        };

       

        fetchUserInformation();
        
    }, [appid]);


    const handleDisableUser = async () => {
        try {
            const response = await axios.post('https://admin-backend-w7q6.onrender.com/disable-user', { userId: appid });
            console.log(response.data.message);
            navigate('/user/dashboard');
        } catch (error) {
            console.error('Error disabling user account:', error);
            console.log('Failed to disable user account');
        }
    };

    const handleenable = async () => {
        try {
            const response = await axios.post('https://admin-backend-w7q6.onrender.com/enable-user', { userId: appid });
            console.log(response.data.message);
            window.location.reload();
        } catch (error) {
            console.error('Error disabling user account:', error);
            console.log('Failed to disable user account');
        }
    }



      
       

    


    return (
        <section style={{ backgroundColor: theme === DARK_THEME ? "#272a3f" : "#fafafa", }} className="bg-white dark:bg-gray-900">





            <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16 relative">
                {/* <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white" style={{ color: theme === DARK_THEME ? "white" : "black", }}>Update User</h2> */}

                {
                    userDisabled && (
                        <div className="flex items-center p-4 mb-4 text-sm text-white rounded-lg bg-red-600 dark:bg-red-800" role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="font-large">Account Disabled ! Enable it Now.  </span>
                        </div>
                    )
                }


                <div className="flex justify-center mb-8">
                    <img className="rounded-full w-36 h-36" src={userData.image} alt="Not Load"></img>

                </div>

                <form>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-1">
                        <div className="sm:col-span-2">
                            <label for="name" style={{ color: theme === DARK_THEME ? "white" : "black", }} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                            <input style={{ backgroundColor: theme === DARK_THEME ? "#3838548d" : "#fafafa", color: theme === DARK_THEME ? "white" : "black", }} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={name} /></div>
                        <div className="w-full">
                            <label style={{ color: theme === DARK_THEME ? "white" : "black", }} for="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input style={{ backgroundColor: theme === DARK_THEME ? "#3838548d" : "#fafafa", color: theme === DARK_THEME ? "white" : "black", }} type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={email} placeholder="Product brand" required="" /></div>
                        <div className="w-full">
                            <label style={{ color: theme === DARK_THEME ? "white" : "black", }} for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">App ID</label>
                            <input style={{ backgroundColor: theme === DARK_THEME ? "#3838548d" : "#fafafa", color: theme === DARK_THEME ? "white" : "black", }} type="text" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={appid} required="" /></div>
                        <div className="w-full">
                            <label style={{ color: theme === DARK_THEME ? "white" : "black", }} for="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About</label>
                            <input style={{ backgroundColor: theme === DARK_THEME ? "#3838548d" : "#fafafa", color: theme === DARK_THEME ? "white" : "black", }} type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={about} placeholder="Product brand" required="" /></div>

                        <div className="w-full ">
                            <label style={{ color: theme === DARK_THEME ? "white" : "black", }} for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notification Token</label>
                            <input style={{ backgroundColor: theme === DARK_THEME ? "#3838548d" : "#fafafa", color: theme === DARK_THEME ? "white" : "black", }} type="text" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={token} placeholder="$299" required="" /></div>

                        <div className="w-full">
                            <label style={{ color: theme === DARK_THEME ? "white" : "black", }} for="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Created At</label>
                            <input style={{ backgroundColor: theme === DARK_THEME ? "#3838548d" : "#fafafa", color: theme === DARK_THEME ? "white" : "black", }} type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={createdat} placeholder="Product brand" required="" /></div>

                        <div className="w-full ">
                            <label style={{ color: theme === DARK_THEME ? "white" : "black", }} for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Active</label>
                            <input style={{ backgroundColor: theme === DARK_THEME ? "#3838548d" : "#fafafa", color: theme === DARK_THEME ? "white" : "black", }} type="text" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={active} placeholder="$299" required="" /></div>




                    </div>


                    <div className="flex items-center space-x-4 mt-10">

                        <Link to={'/user/dashboard'}>
                            <button type="button" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" >Back</button>
                        </Link>

                        {
                            userDisabled ? (
                                <button onClick={() => {
                                    deleteref.current.classList.remove("hidden");
                                }} style={{ marginLeft: '29rem', border: '1px solid white    ' }} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                                    Enable
                                </button>
                            )
                                : (
                                    <button onClick={() => {
                                        modalRef.current.classList.remove("hidden");
                                        
                                    }} style={{ marginLeft: '29rem', border: '1px solid red    ' }} type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                        <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                        Disable
                                    </button>
                                )

                        }
                    </div>
                </form>





                <div
                    id="popup-modal"
                    ref={modalRef}
                    tabIndex="-1"
                    className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-90"
                >
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div style={{ backgroundColor: theme === DARK_THEME ? " var(--secondary-color)" : "#fafafa", }} className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button onClick={() => { deleteref.current.classList.add("hidden"); }} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                <MdOutlineClose size={18} />
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-4 md:p-5 text-center">
                                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <h3 style={{ color: theme == DARK_THEME ? "white" : 'black' }} className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to Disable {userData.name} Account?</h3>
                                <button onClick={handleDisableUser} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                    Yes, I'm sure
                                </button>
                                <button onClick={() => {
                                    deleteref.current.classList.add("hidden");
                                }} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    id="popup-modal"
                    ref={deleteref}
                    tabIndex="-1"
                    className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-90"
                >
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div style={{ backgroundColor: theme === DARK_THEME ? " var(--secondary-color)" : "#fafafa", }} className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button onClick={() => { deleteref.current.classList.add("hidden"); }} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                <MdOutlineClose size={18} />
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-4 md:p-5 text-center">
                                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <h3 style={{ color: theme == DARK_THEME ? "white" : 'black' }} className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Enable this user's account.</h3>
                                <button data-modal-hide="popup-modal" type="button" onClick={handleenable} className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                    Enable
                                </button>
                                {/* <button onClick={() => {
                                    modalRef.current.classList.add("hidden");
                                }} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </section>
    )

}

export default Edituser;