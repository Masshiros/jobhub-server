const router = require("express").Router();
const bookmarkController = require("../controllers/bookmark.controller");
const { verifyToken } = require("../middleware/verify-token");

// CREATE BOOKMARKS
router.post("/", bookmarkController.createBookmark);

// DELETE BOOKMARKS

router.delete("/:id", verifyToken, bookmarkController.deleteBookmark);

// GET BOOKMARKS
router.get("/:userId", bookmarkController.getBookMarks);

module.exports = router;
