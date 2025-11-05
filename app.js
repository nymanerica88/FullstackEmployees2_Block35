import express from "express";
import router from "./api/employees.js";
// import 'dotenv/config'; // auto loads .env

// import { router } from "./api/employees.js"; - already declared
const app = express();

// TODO: this file!

// Middleware to parse request
// Middlware goes first, and then the routes, and then the error handlers
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the Fullstack Employees API.");
});

app.use("/employees", router);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Sorry! Something went wrong :(");
});

export default app;