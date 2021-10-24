const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const itemRoute = require("./routes/itemRoute.js");
const listRoute = require("./routes/listRoute.js");
const path = require("path");


const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());

app.use(express.json());
app.use("/api/items", itemRoute);
app.use("/api/lists", listRoute);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "client", "build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
} else {
    app.get("/", (req, res) => {
        res.json("api running");
    })
}

async function start() {
    try {
        await mongoose.connect(
            process.env.MONGO_URL || "mongodb+srv://admin:Ostap123@cluster0.akdio.mongodb.net/trello-clone?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            () => {
                console.log("Connected to MongoDB");
            }
        );

        app.listen(PORT, () => {
            console.log(`The server is running on http://localhost:${PORT}`);
        });
    } catch (e) {
        console.error(e);
    }
}

start();



