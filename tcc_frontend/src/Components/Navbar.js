import { Link } from "react-router-dom";
import Logo from "../Assets/Images/toktoklogo.webp";
import {useState, useEffect} from "react";

function Navbar() {

    function createNewNavbarTab(productName) {
        return (
            <div className={"navbar--tabs"}>
                {productName}
            </div>
        )
    }

    const [productArray, setProductArray] = useState([]);
    useEffect(()=>{
      // This is an array containing the products name
      const tempProductArray = ['product1', 'product2', 'product3', 'product4'];
      setProductArray(tempProductArray.map(createNewNavbarTab));
    }, [])

    return (
        <nav className={"navbar navbar-sticky"}>
          <div className="navbar--logo-holder">
            <Link to="/">
              <img src={Logo} alt="logo" className="navbar--logo" />
            </Link>
          </div>
          {productArray}
        </nav>
      );
}

export default Navbar;