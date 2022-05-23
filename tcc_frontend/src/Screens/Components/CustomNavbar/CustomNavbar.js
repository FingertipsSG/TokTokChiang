import { Link } from 'react-router-dom';
import React from 'react';
import "./CustomNavbar.css";
import { navItems } from '../NavItems/NavItems';
import CustomButton from '../CustomButton/CustomButton';
import { useNavigate } from "react-router-dom";

function CustomNavbar() {
  // const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    navigate("/admin");
    window.location.reload();
  };

  return (
    <>
      <nav className="admin-navbar">
        <Link to="/adminportal" className="admin-navbar-logo">
          {/* <img src={require("../../../Assets/Images/toktoklogo.png")} alt="Logo" /> */}
          <div className="logo"></div>
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
                <Link to={item.path}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
        <CustomButton path ="/" onClick={logOut} title="Sign Out" />
      </nav>
    </>
  );
}

export default CustomNavbar;
