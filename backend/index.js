const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
	cors: {
		origin: "*",
		method: ["GET", "POST"],
		credentials: true,
	},
});

io.on("connection", (socket) => {
	console.log("User connected on next: ", socket.id, "HERE");

	socket.on("canvas-data", (data) => {
		io.emit("canvas-data", data);
		// console.log("payload", data);
	});
});

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/whiteboard");
// signup
app.post("/api/register", async (req, res) => {
	console.log("index 15", req.body);
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10);
		const getMyColor = () => {
			let n = (Math.random() * 0xfffff * 1000000).toString(16);
			return "#" + n.slice(0, 6);
		};
		console.log(getMyColor(), "getMyColor");
		const userData = await User.create({
			firstname: req.body.name.firstname,
			lastname: req.body.name.lastname,
			email: req.body.email,
			password: newPassword,
			color: getMyColor(),
		});
		console.log("line 28 backend", userData);
		res.json({ status: "ok" });
		console.log("line 32 backend", res.body);
	} catch (err) {
		console.log(err);
		res.json({ status: "error", error: err.message });
	}
});

// login
app.post("/api/login", async (req, res) => {
	console.log("index 39", req.body);

	const user = await User.findOne({
		email: req.body.email,
	});
	console.log("====================================");
	console.log(user);
	console.log("====================================");

	if (!user) {
		return { status: "error", error: "Invalid login" };
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	);

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			"secret123"
		);

		return res.json({ status: "ok", user: token, color: user.color });
	} else {
		return res.json({ status: "error", user: false });
	}
});

// whiteboard GET
app.get("/api/whiteboard", async (req, res) => {
	const token = req.headers["x-access-token"];

	try {
		const decoded = jwt.verify(token, "secret123");
		const email = decoded.email;
		const user = await User.findOne({ email: email });

		return res.json({
			status: "ok",
			color: user.color,
			username: user.firstname,
		});
	} catch (error) {
		console.log(error);
		res.json({ status: "error", error: "invalid token" });
	}
});

// whiteboard POST
app.post("/api/whiteboard", async (req, res) => {
	const token = req.headers["x-access-token"];

	try {
		const decoded = jwt.verify(token, "secret123");
		const email = decoded.email;
		await User.updateOne({ email: email }, { $set: { quote: req.body.quote } });

		return res.json({ status: "ok" });
	} catch (error) {
		console.log(error);
		res.json({ status: "error", error: "invalid token" });
	}
});

var server_port = process.env.PORT || 8080;
http.listen(server_port, () => {
	console.log("====================================");
	console.log(`server started on ${server_port}`);
	console.log("====================================");
});
