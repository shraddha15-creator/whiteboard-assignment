import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
	const location = useLocation();

	const token = localStorage.getItem("token");

	return token ? (
		children
	) : (
		<Navigate to="/" state={{ from: location?.pathname }} replace />
	);
};
