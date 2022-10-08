import { useState } from "react";
import { Link } from "react-router-dom";

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
		<div className="">
			<h2>Login</h2>
			<form onSubmit={loginUser}>
				<input
					type="email"
					placeholder="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Login</button>
			</form>
			<Link to="/signup">Register </Link>
		</div>
	);
};

export default Login;
