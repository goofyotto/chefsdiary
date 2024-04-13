
const express = require("express");
const router = express.Router();

router.get("/home", (req, res, next) => {
    console.log("Get request arrived at (/home)")
    res.send("This is the new homepage request");
});

module.exports = router;