const express = require("express")
const router = express.Router()
const path = "/auth"

const authController = require("../controllers/authController")

router.post("/register", authController.register)
router.post("/login", authController.login)

module.exports = { path, router }
