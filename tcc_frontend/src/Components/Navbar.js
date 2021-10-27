import { Link } from "react-router-dom";
import Logo from "../Assets/Images/toktoklogo.webp";
import {useState } from "react";

function Navbar() {
	const [subProducts, setSubProducts] = useState("hover--hide");
	const showSubProducts = () => {
		setSubProducts("hover--show");
	};
	const hideSubProducts = () => {
		setSubProducts("hover--hide");
	};

	// To populate the nav bar
	let productArray = ["product1", "product2", "product3"];

	function linkArray(productName) {
		return (
			<div 
				// className={"navbar--tabs"} 
				onMouseEnter={()=>{
					showSubProducts();
				}}   
				onClick={()=>{
					hideSubProducts();
				}}   
			>
				<Link to={`/${productName}`} className='navbar__productLink'>
					{productName}
				</Link>
			</div>
		);
	}

	let navbarProductArray = productArray.map(linkArray);

	// To show products when hovering 
	function subProduct(productName) {
		return (
			<Link 
				to={`/${productName}`} 
				className="hover__link" 
				onClick={()=>{
					hideSubProducts();
				}}
			>
				{productName}_1
			</Link>
		);
	}

	let subProductsArray = productArray.map(subProduct);

	return (
		<div>
			<nav className="navbar navbar__sticky">
				<div >
					<Link to="/">
						<img src={Logo} alt="logo" className="navbar__logo" />
					</Link>
				</div>
				{navbarProductArray}
			</nav>
			<div 
				className={subProducts}
				onMouseEnter={()=>{
					showSubProducts();
				}} 
				onMouseLeave={()=>{
					hideSubProducts();
				}}
			>
				{subProductsArray}
			</div>
		</div>
	);
}

export default Navbar;