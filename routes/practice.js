const express = require("express")
const isAuthenticated = require("../middleware/isAuthenticated")
const router = express.Router()
const path = "/pieces/:pieceId/practice"

router.get("/", isAuthenticated, practiceController.get)
router.get("/:id", isAuthenticated, practiceController.get)
router.delete("/:id", isAuthenticated, practiceController.delete)
router.post("/", isAuthenticated, practiceController.post)

module.exports = { path, router }
