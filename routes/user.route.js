const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { verifyAndAuthorization } = require("../middleware/verify-token");

// UPDATE USER
router.put("/:id", verifyAndAuthorization, userController.updateUser);

// UPDATE USER
router.delete("/:id", verifyAndAuthorization, userController.deleteUser);

module.exports = router;
