const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000",
        "https://task-manager-app-9r26.onrender.com"
    ],
    credentials: true
}));
app.use("/api/auth", authRoutes);
// test route
app.use("/api/tasks", taskRoutes);
app.get("/", (req, res) => {
    res.send("API is running...");
});


// connect DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));