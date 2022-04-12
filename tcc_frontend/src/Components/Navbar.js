import { Link } from "react-router-dom";
import Logo from "../Assets/Images/toktoklogo.webp";
import PropTypes from "@babel/traverse";
import "../Components/css/navbar.css";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
//ONLY USE AFTER GOT THE PRODUCTS 

function Navbar({ products }) {
	//console.log("sgsd");
	//console.log(products);
	// eslint-disable-next-line no-unused-vars
	let [mainProductName, setMainProductName] =
		useState(null);
	// eslint-disable-next-line no-unused-vars
	let [mainProductId, setMainProductId] =
		useState(null);

	let [mainProductImg, setMainProductImage] =
		useState(null);

	const [subProducts, setSubProducts] =
		useState("hover--hide");

	const showSubProducts = (productName, productId, productImg) => {
		setSubProducts("hover--show");
		setMainProductName(productName);
		setMainProductId(productId);
		setMainProductImage(productImg);
	};

	const hideSubProducts = () => {
		setSubProducts("hover--hide");
	};

	// To populate the nav bar
	let [productArray, setProductArray] =
		useState([]);
	//console.log(productArray);


	function linkArray(product) {
		let productName = product.product_name;
		let productId = product.id;
		let productImg = product.product_image;
		// console.log(productName);
		// console.log(productId);
		return (
			<div
				onMouseEnter={() => {
					showSubProducts(productName, productId, productImg);
				}}
				onClick={() => {
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

	useEffect(() => {
		let tempArray = [];
		// eslint-disable-next-line react/prop-types
		tempArray = products.map(linkArray);
		//setting productArray to tempArray
		setProductArray(tempArray);
	}, [products]);
	//console.log(productArray);

	//To show products when hovering 
	function subProduct(productName, productId, productImg) {
		return (
			<Link
				to={`/product${productId}`}
				className="hover__link"
				onClick={() => {
					hideSubProducts();
				}}
			>
				<div>
					{/* {productImg} */}
					{productImg}
					<br></br>
					{productName}
				</div>

			</Link>
		);
	}

	let subProductsArray = subProduct(mainProductName, mainProductId, mainProductImg);
	console.log(mainProductId);

	return (
		<div>
			<nav className="navbar navbar__sticky" style={{ height: "90px", backgroundColor: "#f7f7f7" }}>
				<div style={{ width: "100%" }}>
					<Link to="/" style={{ float: "left", marginLeft: "165px" }}>
						<article>
							<a className="topTitle">
								HOME
							</a>
							<img src={Logo} alt="logo" className="navbar__logo" />
						</article>
					</Link>
					<div style={{ marginTop: "10px" }}>
						<Link to="/products" className="linkLast">Lorem ipsum</Link>
						<Link to="/products" className="link">Lorem ipsum</Link>
						<Link to="/products" className="link">Lorem ipsum</Link>
						<Link to="/products" className="link">Doll w/ fan</Link>
					</div>
				</div>
				{productArray}
			</nav>
			<div
				className={subProducts}
				onMouseLeave={() => {
					hideSubProducts();
				}}
			>
				{subProductsArray}
			</div>
		</div>
	);
}

Navbar.propTypes = {
	products: PropTypes.object
};

export default Navbar;