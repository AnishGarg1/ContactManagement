const express = require("express");
const app = express();
const dotenv = require("dotenv");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors")

const userRoutes = require("./routes/User");
const contactRoutes = require("./routes/Contact");

// Connecting to database
database.dbConnect();

dotenv.config(); // parsing .env file variables

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: '*',  // This will allow requests from all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,  // This will allow cookies and credentials to be sent along with requests
}));

const port = process.env.PORT || 4000;

// routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/contact", contactRoutes);

app.get("/", (req, res) => {
    res.send("Rehaabit Contact App");
})

app.listen(port, () => {
    console.log(`App is listerning on port ${port}`);
})