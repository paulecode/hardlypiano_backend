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
router.post("/", pieceController.create)
router.delete("/:id", pieceController.deleteOne)
router.delete("/", pieceController.deleteMany)

router.get("/recently-practiced", pieceController.getRecentlyPracticed())
router.get("/longest-since-practice", pieceController.getLongestSincePractice())
router.get("/least-practiced", pieceController.getLeastPracticed())
router.get("/most-practiced", pieceController.getMostPracticed())

module.exports = { path, router }
