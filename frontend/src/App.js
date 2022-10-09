import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Whiteboard } from "./pages/Whiteboard";
function App() {
	return (
		<div className="app-container">
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/whiteboard" element={<Whiteboard />} />
			</Routes>
		</div>
	);
}

export default App;
