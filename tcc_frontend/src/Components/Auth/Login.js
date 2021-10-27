import "./Styles.css";

function Login() {
	return (
		<form>
			<h3>Log in</h3>

			<div className="form">
				<input
					type="email"
					placeholder="Enter email"
					className="form__input"
				/>
			</div>

			<div className="form">
				<input
					type="password"
					placeholder="Enter password"
					className="form__input"
				/>
			</div>

			<div className="form">
				<div >
					<input
						type="checkbox"
					/>
					<label>
            Remember me
					</label>
				</div>
			</div>

			<button type="submit" className="btn btn-dark btn-lg btn-block">
        Sign in
			</button>
			<p>
        Forgot <a href="#">password?</a>
			</p>
		</form>
	);
}

export default Login;