import React from "react";
import BrandLogo from "../assets/brand-logo.png";
import "./navbar.css";

export const Navbar = ({ color, setColor, user }) => {
	return (
		<div className="navbar">
			<img src={BrandLogo} alt="brand-logo" />
			<div className="user-color-name">
				<input
					type="color"
					value={color}
					onChange={(e) => setColor(e.target.value)}
					disabled
					id="user-color"
				/>
				<span className="username">{user}</span>
			</div>
		</div>
	);
};
