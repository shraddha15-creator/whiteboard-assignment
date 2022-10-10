import { useNavigate } from "react-router-dom";
import BrandLogo from "../assets/brand-logo.png";
import "./navbar.css";

export const Navbar = ({ color, setColor, user }) => {
	const navigate = useNavigate();

	const logoutHandler = () => {
		localStorage.removeItem("token");
		navigate("/");
	};

	return (
		<div className="navbar">
			<img src={BrandLogo} alt="brand-logo" className="naya-logo" />
			<div className="user-color-name nav-right">
				<input
					type="color"
					value={color}
					onChange={(e) => setColor(e.target.value)}
					disabled
					id="user-color"
				/>
				<span className="username">{user}</span>
				<button className="auth-btn" onClick={logoutHandler}>
					Logout
				</button>
			</div>
		</div>
	);
};
