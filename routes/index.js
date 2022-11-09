const express = require("express")
const router = express.Router()
const path = "/"

router.get("/", async (req, res) => {
    res.send("Hello World")
})

module.exports = { path, router }
