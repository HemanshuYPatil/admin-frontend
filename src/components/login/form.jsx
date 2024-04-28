import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext"; // Import ThemeContext
import { DARK_THEME } from "../../constants/themeConstants";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token !== null;
};


const LoginForm = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState('');
  const [success, setsuccess] = useState(false);
  const [documents, setDocuments] = useState([]);
 
  useEffect(() => {

    if (isAuthenticated()) {
      navigate('/user/dashboard');
    }
  }, [navigate]);

  const fetchData = async () => {
    try {

      const response = await fetch('https://chatbuddy-9d4f4-default-rtdb.firebaseio.com/admins.json');
      if (!response.ok) {
        throw new Error('No Internet Connection ');
      }
      const data = await response.json();

      const documentsArray = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      })) : [];

      const isPresent = documentsArray.some(doc => doc.Email === email && doc.Password === password);
     
      if (isPresent) {
        setsuccess(true);
        localStorage.setItem('token', true);
        localStorage.setItem('logged-user', email);
        setTimeout(() => {
          navigate('/user/dashboard');
          setsuccess(false);
        }, 3000);
      } else {
        seterror('Invalid Details');
        setTimeout(() => seterror(null), 5000);
      }
      
              

      
    } catch (error) {
      seterror(error.message);
    }
  };


  const handlesubmit = (e) => {

    e.preventDefault();


    fetchData();
  };



  function handleclick() {
    navigate('/register');
  }
  return (
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
      <h1 className={`text-xl font-semibold mb-8 ${theme === DARK_THEME ? "text-white" : "text-gray-900"
        }   `}>
        Welcome Back! Login to Your Account
      </h1>


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
            className={`block mb-2 text-sm font-medium ${theme === DARK_THEME ? "text-white" : "text-gray-900"
              }`}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${theme === DARK_THEME
              ? "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              : ""
              }`}
            placeholder="email@gmail.com"
            onChange={(e) => setemail(e.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className={`block mb-2 text-sm font-medium ${theme === DARK_THEME ? "text-white" : "text-gray-900"
              }`}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="******"
            className={`bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${theme === DARK_THEME
              ? "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              : ""
              }`}
            onChange={(e) => setpassword(e.target.value)}

            required
          />
        </div>
        <div className="flex items-center mb-5">
          <input
            id="remember"
            type="checkbox"
            value=""
            className={`w-4 h-4 border border-gray-300 rounded ${theme === DARK_THEME
              ? "bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              : "bg-gray-50"
              }`}
          // onChange={(e)=> console.log(e)}

          />
          <label
            htmlFor="remember"
            className={`ml-2 text-sm font-medium ${theme === DARK_THEME ? "text-gray-300" : "text-gray-900"
              }`}
          >
            Remember me
          </label>
        </div>
        <button
          type="submit"
          disabled={success}
          className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 ${theme === DARK_THEME
            ? "dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            : ""
            }`}
        >
          {success ?
            <div role="status">
              <svg aria-hidden="true" className="mr-2 inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <p className="sr-only">Logging</p>
            </div> : 'Login Now'
          }
        </button>

        {/* <Link to={'/login'}>ji</Link>     */}

        <p className={`text-sm text-center mt-6 font-semibold mb-8 ${theme === DARK_THEME ? "text-white" : "text-gray-900"
          }   `}>Don't Have Account.<span onClick={handleclick} className="text-blue-500" style={{ cursor: 'pointer', }}> Register Now!</span></p>
      </form>


    </div>
  );
};

export default LoginForm;
