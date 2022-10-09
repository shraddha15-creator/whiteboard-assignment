import React, { useEffect, useRef, useState } from "react";
import jwt from "jsonwebtoken";
import CanvasDraw from "@win11react/react-canvas-draw";
import io from "socket.io-client";
import "./pages.css";
import { Panel } from "../components/Panel";
import { Navbar } from "../components/Navbar";

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
		console.log(data);
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
		const img = require("../assets/bg2.png");
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
		// console.log("useeffect 104", base16ImageData);
		socket.emit("canvas-data", { base16ImageData });
	};

	useEffect(() => {
		socket.on("canvas-data", (data) => {
			base16ImageData = base16ImageData + data;
		});
	});

	return (
		<div>
			<Navbar color={color} setColor={setColor} user={user} />
			<div className="whiteboard-container">
				<div>
					<CanvasDraw
						style={{
							boxShadow:
								"0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)",
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
