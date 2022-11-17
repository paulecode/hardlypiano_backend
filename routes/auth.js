const express = require("express")
const router = express.Router()
const path = "/auth"

// Security
if (!process.env.NODE_ENV === "test") {
    const bouncer = require("../security/bouncer")
    router.use(bouncer.block)
}

const authController = require("../controllers/authController")

router.post("/register", authController.register)
router.post("/login", authController.login)
router.post("/changepassword", authController.changePassword)

module.exports = { path, router }
