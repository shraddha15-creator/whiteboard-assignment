import { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function loginUser(event) {
		event.preventDefault();
		const response = await fetch("http://localhost:8080/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});
		const data = await response.json();

		if (data.user) {
			localStorage.setItem("token", data.user);
			alert("login successful");
			window.location.href = "/whiteboard";
		} else {
			alert("login failed");
		}

		console.log(data);
	}

	return (
		<div className="auth-container">
			<p className="auth-title">Log in to continue</p>
			<form onSubmit={loginUser}>
				<input
					className="auth-input"
					type="email"
					placeholder="Email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					className="auth-input"
					type="password"
					placeholder="Password"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<p className="forgot-pw">Forgot Password?</p>
				<button type="submit" className="auth-btn">
					Log in
				</button>
			</form>
			<span className="no-acc">
				Don't have account?
				<Link to="/signup" className="signup-link">
					Register{" "}
				</Link>
			</span>
		</div>
	);
};

export default Login;
