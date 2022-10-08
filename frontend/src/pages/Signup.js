import { useState } from "react";
import { Link } from "react-router-dom";

export const Signup = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function registerUser(event) {
		event.preventDefault();
		const response = await fetch("http://localhost:8080/api/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, email, password }),
		});
		const data = await response.json();
		console.log(data);
	}

	return (
		<div className="">
			<h2>Register</h2>
			<form onSubmit={registerUser}>
				<input
					type="text"
					placeholder="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
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
				<button type="submit">Register</button>
				<Link to="/">Login </Link>
			</form>
		</div>
	);
};
