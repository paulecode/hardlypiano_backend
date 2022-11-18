const express = require("express")
const isAuthenticated = require("../middleware/isAuthenticated")
const router = express.Router()
const path = "/pieces/:pieceId/practice"

router.use(isAuthenticated)

router.get("/", practiceController.get)
router.get("/:id", practiceController.get)
router.delete("/:id", practiceController.delete)
router.post("/", practiceController.post)

module.exports = { path, router }
