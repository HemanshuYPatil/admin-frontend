import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext"; // Import ThemeContext
import { DARK_THEME } from "../../constants/themeConstants";
import { useNavigate } from "react-router-dom";
import { ref, set, getDatabase, push } from "firebase/database";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from 'uuid';


const RegisterForm = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');

  const [success, setsuccess] = useState(false);
  const [error, seterror] = useState('');


  const handlesubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (!name || !email || !password || !cpassword) {
      seterror('All Fields Required');
      setTimeout(() => seterror(''), 5000);
      return;
    }
    if (password !== cpassword) {
      seterror('Passwords Do Not Match');
      setTimeout(() => seterror(''), 5000);
      return;
    }

   

    
   

   
    try {
      const db = getDatabase();
      const uniqueId = uuidv4();
      const path = `admin-request/${uniqueId}`; 
  
  
      const acceptedRequestsRef = ref(db, path);
  
      // Your data object to be stored
      const userData = {
          Name: name,
          id: uniqueId,
          Email: email,
          Password: password,
          Time: Date.now(),
      };
  
   
      set(acceptedRequestsRef, userData)
          .then(() => {
              console.log("Data stored successfully with unique ID:", uniqueId);
              setsuccess(true);
              setTimeout(() => {
                setsuccess(false);
                navigate('/');
              }, 6000);
          })
          .catch((error) => {
              console.error("Error storing data:", error);
          });
  } catch (error) {
      console.error("Error accessing database:", error);
  }




    // axios.post('https://chatbuddy-9d4f4-default-rtdb.firebaseio.com/admin-request.json', userData)
    //   .then((response) => {
    //     setsuccess(true);
        // setTimeout(() => {
        //   setsuccess(false);
        //   navigate('/');
        // }, 3000);
    //   })
    //   .catch((error) => {
    //     seterror('Error registering user');
    //     setTimeout(() => seterror(''), 5000);
    //   });
  
  };




  function handleclick() {
    navigate('/');
  }

  return (
    <>
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme === DARK_THEME ? "#383854" : "#fafafa",
        }}
        className={`content-area ${theme === DARK_THEME ? "dark" : ""}`}
      >
        <h1 className={`text-xl font-semibold mb-8 ${theme === DARK_THEME ? "text-white" : "text-gray-900"}   `}>
          Welcome ! Register Here
        </h1>

        {success && (
          <div className="flex items-center p-4 mb-4 text-base text-black-500 border border-green-300 rounded-lg bg-green-200 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium text-bold">Successfully Apply for Admin!    </span>
              <p>Wait for approve your request</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center p-4 mb-4 text-base text-black-800 border border-red-300 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">{error}!</span>
            </div>
          </div>
        )}

        <form className="max-w-sm w-full px-4" onSubmit={handlesubmit}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className={`block mb-2 text-sm font-medium ${theme === DARK_THEME ? "text-white" : "text-gray-900"}`}
            >
              Full Name
            </label>
            <input
              type="text"
              id="email"
              className={`bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${theme === DARK_THEME
                ? "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                : ""}`}
              placeholder="Name"
              onChange={(e) => setname(e.target.value)}

            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className={`block mb-2 text-sm font-medium ${theme === DARK_THEME ? "text-white" : "text-gray-900"}`}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${theme === DARK_THEME
                ? "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                : ""}`}
              onChange={(e) => setemail(e.target.value)}
              placeholder="email@gmail.com"

            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className={`block mb-2 text-sm font-medium ${theme === DARK_THEME ? "text-white" : "text-gray-900"}`}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="******"
              className={`bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${theme === DARK_THEME
                ? "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                : ""}`}
              onChange={(e) => setpassword(e.target.value)}

            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className={`block mb-2 text-sm font-medium ${theme === DARK_THEME ? "text-white" : "text-gray-900"}`}
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="******"
              className={`bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${theme === DARK_THEME
                ? "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                : ""}`}
              onChange={(e) => setcpassword(e.target.value)}

            />
          </div>
          <button
            type="submit"
            className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 ${theme === DARK_THEME
              ? "dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              : ""}`}
          >
            Apply
          </button>

          <p className={`text-sm text-center mt-6 font-semibold mb-8 ${theme === DARK_THEME ? "text-white" : "text-gray-900"}   `}>Already Have Account.  <span onClick={handleclick} className="text-blue-500" style={{ cursor: 'pointer', }}> Login Now!</span></p>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
