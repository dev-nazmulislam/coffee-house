import React from "react";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import NightlightIcon from "@mui/icons-material/Nightlight";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
import PersonIcon from "@mui/icons-material/Person";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const [activeMenu] = useState("main");
  const navigate = useNavigate();

  const logOut = () => {
    signOut(auth);
  };

  return (
    <nav className="navbar">
      <div className="navbar-start">
        <Link className="logo" to="/">
          Coffee House
        </Link>
      </div>
      <ul className="navbar-end">
        <li className="nav-item">
          <a href="#" className="icon-button">
            <NightlightIcon />
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="icon-button">
            <ShoppingCartIcon />
          </a>
        </li>
        {user ? (
          <li className="nav-item">
            <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
              {user.photoURL ? (
                <img className="icon-button" src={user?.photoURL} alt="" />
              ) : (
                <PersonIcon />
              )}
            </a>
            {open && (
              <div className="dropdown">
                <CSSTransition
                  in={activeMenu === "main"}
                  timeout={500}
                  classNames="menu-primary"
                  unmountOnExit
                >
                  <div className="menu">
                    <a href="#" className="menu-item">
                      {user.photoURL ? (
                        <img
                          className="icon-button"
                          src={user?.photoURL}
                          alt=""
                        />
                      ) : (
                        <PersonIcon className="icon-button" />
                      )}
                      <span>My Profile</span>
                    </a>
                    <li className="menu-item">
                      {<SettingsIcon className="icon-button" />}
                      <span>Settings</span>
                    </li>
                    <li onClick={logOut} className="menu-item">
                      {<LogoutIcon className="icon-button" />}
                      <span>LogOut</span>
                    </li>
                  </div>
                </CSSTransition>
              </div>
            )}
          </li>
        ) : (
          <li onClick={() => navigate("/login")} className="nav-item">
            <span>Login</span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
