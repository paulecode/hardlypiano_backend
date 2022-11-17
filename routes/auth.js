const express = require("express")
const router = express.Router()
const path = "/auth"

// Security
if (!process.env.NODE_ENV === "test") {
    router.use(require("../security/bouncer").block)
    router.use(require("../security/sanitize").middleware)
}

const authController = require("../controllers/authController")

router.post("/register", authController.register)
router.post("/login", authController.login)
router.post("/changepassword", authController.changePassword)

module.exports = { path, router }
