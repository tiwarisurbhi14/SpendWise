const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const cookieParser = require('cookie-parser'); 
const { readdirSync } = require('fs');
const authRoutes = require("./routes/authRoutes");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'https://spendwise-1-jd2s.onrender.com/api/v1',
    credentials: true
}));


readdirSync("./routes").map((route) => {
    app.use('/api/v1', require('./routes/' + route));
});

app.use("/api/v1/auth",authRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});

const server = () => {
    db(); 
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

server();
