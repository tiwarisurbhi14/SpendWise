const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const cookieParser = require('cookie-parser'); 
const path = require("path");
const { readdirSync } = require('fs');
const authRoutes = require("./routes/authRoutes");
const transactionsRoutes = require("./routes/transactions");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'https://spendwise-1-jd2s.onrender.com',
    credentials: true
}));

app.use("/api/v1",transactionsRoutes);
app.use("/api/v1/auth",authRoutes);


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use(express.static(path.join(__dirname, "../expanse-fe/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../expanse-fe/dist/index.html"));
});

const server = () => {
    db(); 
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

server();
