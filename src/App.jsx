// App.js

import { useContext, useEffect } from "react";
import "./App.scss";
import { ThemeContext } from "./context/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "./constants/themeConstants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoonIcon from "./assets/icons/moon.svg";
import SunIcon from "./assets/icons/sun.svg";
import BaseLayout from "./layout/BaseLayout";
import { Dashboard, PageNotFound } from "./screens";
import LoginForm from "./components/login/form";
import RegisterForm from "./components/register/form";
import Privateroute from "./PrivateRouts/privateroute";
import Appss from "./components/ex";
import Order from "./screens/oder/order";
import Edituser from "./screens/edit/edit";
import Transcation from "./screens/Trancation/trancation";
import Request from "./screens/Request/request";


function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);


  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/ex" element={<Appss />} />
          <Route path="*" element={<PageNotFound />} />

          <Route path="/user" element={<Privateroute />}>
            <Route element={<BaseLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="dashboard/edit" element={<Edituser />} />
              <Route path="order" element={<Order />} />
              <Route path="trancation" element={<Transcation />} />
              <Route path="request" element={<Request />} />
        
            </Route>
          </Route>
        </Routes>


        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
        >
          <img
            className="theme-icon"
            src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
            alt="Theme toggle"
          />
        </button>
      </Router>
    </>
  );
}

export default App;
