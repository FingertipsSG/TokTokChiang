import { Link, NavLink } from "react-router-dom";
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
						{/* <li className="nav-item">
							<NavLink to="/products" className="link nav-link">ABOUT US</NavLink>
						</li> */}
						<li className="nav-item">
							<div className="dropdown">
								<a className="link nav-link home">
									ABOUT US
								</a>
								<div className="dropdown-menu">
									<Link className="dropdown-item" to="/home">TOK TOK CHIANG</Link>
									<Link className="dropdown-item" to="/home2">LAO SAI TAO YUAN</Link>
								</div>
							</div>
						</li>
						<li className="nav-item">
							<div className="dropdown">
								<a className="link nav-link shop">
									SHOP
								</a>
								<div className="dropdown-menu">
									<Link className="dropdown-item" to="/masks">MASKS</Link>
									<Link className="dropdown-item" to="/dolls">DOLLS</Link>
									<Link className="dropdown-item" to="/handpuppets">HAND PUPPETS</Link>
									<Link className="dropdown-item" to="/tshirts">T-SHIRTS</Link>
									<Link className="dropdown-item" to="/framed">FRAMED</Link>
								</div>
							</div>
						</li>	
						<li className="nav-item">
							<div className="dropdown">
								<a className="link nav-link shop">
									SUPPORT
								</a>
								<div className="dropdown-menu">
									<Link className="dropdown-item" to="/services">SERVICE</Link>
									<Link className="dropdown-item" to="/warranty">WARRANTY</Link>
									<Link className="dropdown-item" to="/onlinestores">ONLINE STORE</Link>
								</div>
							</div>
						</li>
						<li className="nav-item">
							<NavLink to="/contactus" activeClassName="active-link" className="link nav-link">CONTACT US</NavLink>
						</li>
					</ul>
				</div>
			</nav >
		</div >
	);
}

export default TopNavBar;