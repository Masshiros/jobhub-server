const router = require("express").Router();
const authController = require("../controllers/auth.controller");

// REGISTRATION

router.post("/register", authController.createUser);

// LOGIN;
router.post("/login", authController.login);

module.exports = router;
