const express = require("express");
const bodyparser = require("body-parser");
const { default: mongoose } = require("mongoose");
const app = express();
const cors = require("cors");

// use of middlewares
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : false}));

// routes to the server
const loginRoutes = require("./routes/router");
const productRoutes = require("./routes/productlist");

// connection to the database
main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb+srv://nitwrohit12345:Rohit12345@cluster0.mjzehea.mongodb.net/assignment?retryWrites=true&w=majority");
    console.log("Databse connection sucessfull...")
}

// cors to integrate fronteend with backend

app.use(cors());

app.use("/api/v1", loginRoutes);
app.use("/api/v1", productRoutes);

app.get("/", (req, res) => {
    res.send("Ok...")
});

// connect to the port
app.listen(8080, () => {
    console.log("Server started at 8080 port..");
})