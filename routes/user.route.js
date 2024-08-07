const router = require("express").Router();
const userController = require("../controllers/user.controller");
const {
  verifyAndAuthorization,
  verifyAndAdmin,
} = require("../middleware/verify-token");

// UPDATE USER
router.put("/:id", verifyAndAuthorization, userController.updateUser);

// DELETE USER
router.delete("/:id", verifyAndAuthorization, userController.deleteUser);
// GET USER
router.get("/:id", verifyAndAuthorization, userController.getUser);
// GET ALL USER
router.get("/:id", verifyAndAdmin, userController.getAllUser);
module.exports = router;
