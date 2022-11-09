const express = require("express")
const router = express.Router()
const path = "/pieces"

const pieceController = require("../controllers/pieceController")
const practiceController = require("../controllers/practiceController")
const isAuthenticated = require("../middleware/isAuthenticated")

// Authenticated middleware
router.use(isAuthenticated)

// Routes
router.get("/", pieceController.getAll)
router.get("/:id", pieceController.get)
router.patch("/:id", pieceController.update)
router.post("/:pieceId/practice", practiceController.create)
router.post("/", pieceController.create)
router.delete("/:id", pieceController.deleteOne)
router.delete("/", pieceController.deleteMany)

module.exports = { path, router }
