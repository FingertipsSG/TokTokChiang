import { Link } from "react-router-dom";
import Logo from "../Assets/Images/toktoklogo.webp";
// eslint-disable-next-line no-unused-vars
import {useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
function Navbar({ products }) {
	
	// eslint-disable-next-line no-unused-vars
	let [mainProductName, setMainProductName] = 
		useState(null);
	// eslint-disable-next-line no-unused-vars
	let [mainProductId, setMainProductId] = 
		useState(null);

	const [subProducts, setSubProducts] = 
		useState("hover--hide");

	const showSubProducts = (productName, productId) => {
		setSubProducts("hover--show");
		setMainProductName(productName);
		setMainProductId(productId);
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
				onMouseEnter={()=>{
					showSubProducts(productName, productId);
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
	}, ...productArray);

	// To show products when hovering 
	function subProduct(productName, productId) {
		return (
			<Link 
				to={`/product${productId}`} 
				className="hover__link" 
				onClick={()=>{
					hideSubProducts();
				}}
			>
				{productName}
			</Link>
		);
	}

	let subProductsArray = subProduct(mainProductName, mainProductId);

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