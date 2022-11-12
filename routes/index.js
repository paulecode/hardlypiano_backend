const express = require("express")
const router = express.Router()
const path = "/"

const db = require("../db")

router.get("/", async (req, res) => {
    if (!db.connected()) {
        res.status(500).send("Internal server error.")
    }
    res.send("Hello World!")
})

module.exports = { path, router }
