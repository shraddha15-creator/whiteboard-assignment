import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Whiteboard } from "./pages/Whiteboard";
import { Toast } from "./components/Toast";
import { PrivateRoute } from "./utils/PrivateRoute";
function App() {
	return (
		<div className="app-container">
			<Toast />

			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				{/* <Route path="/whiteboard" element={<Whiteboard />} /> */}
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
