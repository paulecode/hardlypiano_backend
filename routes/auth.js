const express = require("express")
const router = express.Router()
const path = "/auth"

const authController = require("../controllers/authController")

router.post("/register", authController.register)
router.post("/login", authController.login)
router.post("/changepassword", authController.changePassword)

module.exports = { path, router }
