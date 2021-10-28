import { Link } from "react-router-dom";
import Logo from "../Assets/Images/toktoklogo.webp";
// eslint-disable-next-line no-unused-vars
import {useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
function Navbar({ products }) {

	const [subProducts, setSubProducts] = useState("hover--hide");
	const showSubProducts = () => {
		setSubProducts("hover--show");
	};
	const hideSubProducts = () => {
		setSubProducts("hover--hide");
	};

	// To populate the nav bar
	let [productArray, setProductArray] = 
		useState([]);

	function linkArray(product) {
		let productName = product.product_name;
		let productId = product.id;
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
				<Link to={`/product${productId}`} 
					className='navbar__productLink'>
					{productName}
				</Link>
			</div>
		);
	}

	useEffect(()=>{
		let tempArray = [];
		// eslint-disable-next-line react/prop-types
		tempArray = products.map(linkArray);
		setProductArray(tempArray);
	}, [productArray]);

	// let navbarProductArray = productArray.map(linkArray);

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
				{productArray}
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