const router = require("express").Router();
const jobController = require("../controllers/job.controller");
const {
  verifyAndAuthorization,
  verifyAndAdmin,
} = require("../middleware/verify-token");

// POST JOB
router.post("/", verifyAndAdmin, jobController.createJob);
// UPDATE JOB
router.put("/:id", verifyAndAdmin, jobController.updateJob);
// DELETE JOB
router.delete("/:id", verifyAndAdmin, jobController.deleteJob);
// GET JOB
router.get("/:id", jobController.getJob);
// GET ALL JOBS
router.get("/", jobController.getJobs);

module.exports = router;
