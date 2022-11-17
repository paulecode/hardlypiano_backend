const express = require("express")
const router = express.Router()
const path = "/auth"

// Security
const bouncer = require("../security/bouncer")
router.use(bouncer.block)

const authController = require("../controllers/authController")

router.post("/register", authController.register)
router.post("/login", bouncer.block, authController.login)
router.post("/changepassword", bouncer.block, authController.changePassword)

module.exports = { path, router }
