import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Signup = () => {
	const navigate = useNavigate();
	const [name, setName] = useState({ firstname: "", lastname: "" });
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
		if (data.status === "ok") {
			toast.success("Signed up Successfully");
			navigate("/whiteboard");
		} else if (data.status === "error") {
			toast.warn("User already exist");
		}
	}

	return (
		<div className="auth-container">
			<p className="auth-title">Signup to continue</p>
			<form onSubmit={registerUser}>
				<input
					className="auth-input"
					type="text"
					placeholder="firstname"
					required
					value={name.firstname}
					onChange={(e) =>
						setName((prev) => ({ ...prev, firstname: e.target.value }))
					}
				/>
				<input
					className="auth-input"
					type="text"
					placeholder="lastname"
					required
					value={name.lastname}
					onChange={(e) =>
						setName((prev) => ({ ...prev, lastname: e.target.value }))
					}
				/>
				<input
					className="auth-input"
					type="email"
					placeholder="email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					className="auth-input"
					type="password"
					placeholder="password"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit" className="auth-btn">
					Signup
				</button>
				<span className="no-acc">
					Already have an account?
					<Link to="/" className="signup-link">
						Login
					</Link>
				</span>
			</form>
		</div>
	);
};
