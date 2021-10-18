import { Link } from "react-router-dom";
import Logo from "../Assets/Images/toktoklogo.webp";
import {useState, useEffect} from "react";

function Navbar() {
    const [subProducts, setSubProducts] = useState("hideSubProducts");
    const showSubProducts = e => {
      setSubProducts("showSubProducts");
    };

    const hideSubProducts = e => {
      setSubProducts("hideSubProducts");
    };

    // To populate the nav bar
    let productArray = ['product1', 'product2', 'product3']

    function linkArray(productName) {
      return (
        <div 
          className={"navbar--tabs"} 
          onMouseEnter={(e)=>{
            showSubProducts(e)
          }}   
        >
          <Link to={`/${productName}`}>
            {productName}
          </Link>
        </div>
      )
    }

    let tempArray = productArray.map(linkArray)

    // To show products when hovering 
    function subProduct(productName) {
      return (
        <div className="hoverSubProducts">
          {productName}_1
        </div>
      )
    }

    let subProductsArray = productArray.map(subProduct)

    return (
        <div>
          <nav className={"navbar navbar-sticky"}>
            <div className="navbar--logo-holder">
              <Link to="/">
                <img src={Logo} alt="logo" className="navbar--logo" />
              </Link>
            </div>
            {tempArray}
          </nav>
          <div 
            className={subProducts}
            onMouseEnter={(e)=>{
              showSubProducts(e)
            }} 
            onMouseLeave={(e)=>{
              hideSubProducts(e)
            }}
          >
            {subProductsArray}
          </div>
        </div>
      );
}

export default Navbar;