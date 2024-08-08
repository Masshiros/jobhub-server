const router = require("express").Router();
const jobController = require("../controllers/job.controller");
const {
  verifyAndAuthorization,
  verifyAndAdmin,
} = require("../middleware/verify-token");

// POST JOB
router.post("/:id", verifyAndAdmin, jobController.createJob);
module.exports = router;
