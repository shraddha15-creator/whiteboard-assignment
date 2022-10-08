import React, { useEffect, useRef, useState } from "react";
import jwt from "jsonwebtoken";
import CanvasDraw from "@win11react/react-canvas-draw";

export const Whiteboard = () => {
	const [quote, setQuote] = useState("");
	const [tempQuote, setTempQuote] = useState("");
	const initialColor = "black";
	const [color, setColor] = useState(initialColor);
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
			setQuote(data.quote);
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

	async function updateQuote(e) {
		e.preventDefault();
		const req = await fetch("http://localhost:8080/api/whiteboard", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
			body: JSON.stringify({
				quote: tempQuote,
			}),
		});
		const data = await req.json();
		console.log(data);
		if (data.status === "ok") {
			setQuote(tempQuote);
			setTempQuote("");
		} else {
			alert(data.error);
		}
	}

	const handleExport = () => {
		const d = canvasRef.current.canvasContainer.children[1].toDataURL();
		const w = window.open("about:blank", "image from canvas");
		const img = require("../assets/bg.png");
		w.document.write(
			"<img src='" +
				d +
				"' style='background-image: url( " +
				img +
				"); background-size: contain;background-repeat: no-repeat;  ' alt='Exporting'/>"
		);
	};

	return (
		<div>
			<h2>Dashboard</h2>
			<p>Your quote: {quote || "No quote found"}</p>
			<form onSubmit={updateQuote}>
				<input
					type="text"
					placeholder="Quote"
					value={tempQuote}
					onChange={(e) => setTempQuote(e.target.value)}
				/>
				<button type="submit">Update quote</button>
			</form>
			<input
				type="color"
				value={color}
				onChange={(e) => setColor(e.target.value)}
			/>
			<CanvasDraw
				style={{
					boxShadow:
						"0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)",
				}}
				brushRadius={2}
				canvasWidth={1000}
				canvasHeight={500}
				brushColor={color}
				ref={canvasRef}
			/>
			<button onClick={handleExport}>Save</button>
		</div>
	);
};
