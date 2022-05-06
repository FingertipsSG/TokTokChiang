import { Link } from "react-router-dom";
import "../Components/css/navbar.css";
import Logo from "../Assets/Images/toktoklogo.png";
import { Helmet } from "react-helmet";


function TopNavBar() {
	return (
		<div>
			<Helmet>
				<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
				<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
			</Helmet>
			<nav className="navbar navbar__sticky navbar-expand-lg navbar-light" style={{ backgroundColor: "#f7f7f7" }}>
				<Link to="/" className="navbar_img">
					<img src={Logo} alt="logo" className="navbar-brand navbar__logo" />
				</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#toggler">
					<span className="navbar-toggler-icon"></span>
				</button>

				{/* links */}
				<div className="collapse navbar-collapse" id="toggler" >
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link to="/products" className="linkFirst nav-link">About US</Link>
						</li>
						<li className="nav-item">
							<Link to="/products" className="link nav-link">SHOP</Link>
						</li>
						<li className="nav-item">
							<Link to="/products" className="link nav-link">SERVICES</Link>
						</li>
						<li className="nav-item">
							<Link to="/products" className="link nav-link">CONTACT US</Link>
						</li>
					</ul>
				</div>
			</nav>

		</div>
	);
}

export default TopNavBar;