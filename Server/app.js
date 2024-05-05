
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

const recipeController = require("./controller/recipe");
const userController = require("./controller/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/recipe", recipeController);
app.use("/user", userController);

app.listen(port, () => {
    console.log(`Chef's Diary listening on port ${port}`);
});