import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

export default class AdminLogin extends Component {

	constructor(props){
		super(props);
		this.state = {password: "", error: "none", 
			isLogin: false, data: "none"};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit() {
		let url = "http://localhost:5001/getPassword?password=" 
			+ this.state.password ;
		fetch(url)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				this.setState({"isLogin": true});
				this.setState({"data": data});
				// }
			})
			.catch((err) => {
				this.setState({"error": err.message});
			});
		// }
	}

	handleChange(event) {
		this.setState({password: event.target.value});
	}

	render() {
		if (this.state.isLogin){
			return <Route exact path="/admin-products">
				<Redirect to="/admin-products" />
			</Route>;
		}
		return (
			<form>
				<h3>Log in</h3>
				<div className="form-group">
					<label>Password</label>
					<input
						type="password"
						className="form-control"
						placeholder="Enter password"
						onChange={this.handleChange}
					/>
				</div>
				<div className="form-group">
					<div className="custom-control custom-checkbox">
						<input
							type="checkbox"
							className="custom-control-input"
							id="customCheck1"
						/>
						<label className="custom-control-label" 
							htmlFor="customCheck1">
							Remember me
						</label>
					</div>
				</div>
				<button type="submit" className="btn btn-dark btn-lg btn-block" 
					onSubmit={this.handleSubmit}>
					Sign in
				</button>
				<p className="forgot-password text-right">
					Forgot <a href="#">password?</a>
				</p>
			</form>
		);
	}
}
