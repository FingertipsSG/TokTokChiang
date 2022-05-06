import { NavLink } from "react-router-dom";
import "../Components/css/navbar.css";
import Logo from "../Assets/Images/toktoklogo.png";
import { Helmet } from "react-helmet";


function TopNavBar() {
	return (
		<div className="body">
			<Helmet>
				<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
				<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
			</Helmet>
			<nav className="navbar navbar-expand-lg navbar-light">
				<NavLink to="/" className="navbar_img">
					<img src={Logo} alt="logo" className="navbar-brand navbar__logo" />
				</NavLink>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#toggler">
					<span className="navbar-toggler-icon"></span>
				</button>

				{/* links */}
				<div className="collapse navbar-collapse justify-content-end" id="toggler" >
					<ul className="navbar-nav">
						<li className="nav-item">
							<NavLink to="/products" className="linkFirst nav-link">ABOUT US</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/products" className="link nav-link">SHOP</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/services" className="link nav-link">SERVICES</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/products" className="link nav-link">CONTACT US</NavLink>
						</li>
					</ul>
				</div>
			</nav>

		</div>
	);
}

export default TopNavBar;