import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "./styles/auth.css";

export const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("token");
		token ? navigate("/whiteboard") : navigate("/");
	}, [navigate]);

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
			toast.success("Logged In Successfully!");
			navigate("/whiteboard");
		} else if (data.error === "No user found") {
			toast.error("Wrong Password");
		} else if (data.error === "Invalid login") {
			toast.error("No user found");
		}
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
