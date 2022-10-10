import React, { useEffect, useRef, useState } from "react";
import CanvasDraw from "@win11react/react-canvas-draw";
import jwt from "jsonwebtoken";
import io from "socket.io-client";
import { Panel, Navbar } from "../components";
import { PrivateRoute } from "../utils/PrivateRoute";
import "./styles/pages.css";

let socket = io.connect("http://localhost:8080");

export const Whiteboard = () => {
	const [user, setUser] = useState("");
	const [color, setColor] = useState();
	const canvasRef = useRef(null);

	async function populateQuote() {
		const req = await fetch("http://localhost:8080/api/whiteboard", {
			headers: {
				"x-access-token": localStorage.getItem("token"),
			},
		});
		const data = await req.json();
		if (data.status === "ok") {
			setUser(data.username);
			setColor(data.color);
		} else {
			alert(data.error);
		}
	}

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const user = jwt.decode(token);
			if (!user) {
				localStorage.removeItem("token");
				window.location.href = "/login";
			} else {
				populateQuote();
			}
		}
	}, []);

	var base16ImageData;

	const handleExport = () => {
		base16ImageData = canvasRef.current.canvasContainer.children[1].toDataURL();
		const w = window.open("about:blank", "image from canvas");
		const img = require("../assets/bg-transparent.png");
		w.document.write(
			"<img src='" +
				base16ImageData +
				"' style='background-image: url( " +
				img +
				"); background-size: contain;background-repeat: no-repeat;  ' alt='Exporting'/>"
		);
	};

	const handleChange = () => {
		base16ImageData = canvasRef.current.canvasContainer.children[1].toDataURL();
		socket.emit("canvas-data", { base16ImageData });
	};

	useEffect(() => {
		socket.on("canvas-data", (data) => {
			base16ImageData = base16ImageData + data;
		});
	});

	return (
		<div>
			<PrivateRoute />
			<Navbar color={color} setColor={setColor} user={user} />
			<div className="whiteboard-container">
				<div>
					<CanvasDraw
						style={{
							boxShadow:
								"1px 1px 2px rgba(0, 0, 0, 0.1),    1px 2px 5px rgba(0, 0, 0, 0.3)",
						}}
						brushRadius={2}
						canvasWidth={1000}
						canvasHeight={600}
						brushColor={color}
						ref={canvasRef}
						onChange={handleChange}
					/>
				</div>
				<Panel handleExport={handleExport} />
			</div>
		</div>
	);
};
