const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");
const cookieParser = require('cookie-parser');

const app = express();

// CORS setup
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// Middleware setup
app.use(express.json({ limit: '10mb' })); // Handle JSON payloads up to 10MB
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Handle URL-encoded payloads up to 10MB
app.use(cookieParser()); // Parse cookies

// Routes
app.use("/api", router);

const PORT = 5000;

// Connect to database and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
        console.log("Connected to database.");
    });
});
