import { Link } from "react-router-dom";
import React from "react";
import "./CustomNavbar.css";
import { navItems } from "../NavItems/NavItems";
import CustomButton from "../CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
import logo from "../../../Assets/Images/toktoklogo.png";

function CustomNavbar({ isLoggedIn }) {
  // const [dropdown, setDropdown] = useState(false);
  var loggedIn;
  const navigate = useNavigate();

  if (isLoggedIn != undefined) {
    loggedIn = isLoggedIn;
  }

  const logOut = () => {
    localStorage.clear();
    navigate("/login", {
      state: {
        isLoggedIn: false,
      },
      replace: true,
    });
    window.location.reload();
  };

  return (
    <>
      <nav className="admin-navbar">
        <Link to="/adminportal" className="admin-navbar-logo">
          <img
            className="TTCLogo"
            src={logo}
            alt="Logo"
            width={200}
            height={40}
          />
        </Link>
        <ul className="admin-nav-items">
          {navItems.map((item) => {
            // if (item.title === "Settings") {
            //   return (
            //     <li
            //     key={item.id}
            //     className={item.cName}
            //     onMouseEnter={() => setDropdown(true)}=
            //     onMouseLeave={() => setDropdown(false)}
            //     >
            //       <Link to={item.path}>{item.title}</Link>
            //       {dropdown && <Dropdown />}
            //     </li>
            //   )
            // }
            return (
              <li key={item.id} className={item.cName}>
                <Link to={item.path} state={{ isLoggedIn: loggedIn }}>
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <CustomButton path="/" onClick={logOut} title="Sign Out" />
      </nav>
    </>
  );
}

export default CustomNavbar;
