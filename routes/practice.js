const express = require("express")
const isAuthenticated = require("../middleware/isAuthenticated")
const router = express.Router()
const path = "/pieces/:pieceId/practice"

const practiceController = require("../controllers/practiceController")

router.use(isAuthenticated)

router.get("/", practiceController.getAll)
router.get("/:id", practiceController.get)
router.delete("/:id", practiceController.delete)
router.post("/", practiceController.post)

module.exports = { path, router }
