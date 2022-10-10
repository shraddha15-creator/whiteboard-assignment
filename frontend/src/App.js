import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./utils/PrivateRoute";
import { Login, Signup, Whiteboard } from "./pages";
import { Toast } from "./components/Toast";
import "./App.css";

function App() {
	return (
		<div className="app-container">
			<Toast />
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route
					path="/whiteboard"
					element={
						<PrivateRoute>
							<Whiteboard />
						</PrivateRoute>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
