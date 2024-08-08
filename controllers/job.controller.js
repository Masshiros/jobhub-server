const Job = require("../models/job.model");
module.exports = {
  createJob: async (req, res) => {
    const newJob = new Job(req.body);
    try {
      const savedJob = await newJob.save();
      const { __v, createdAt, updatedAt, ...info } = savedJob._doc;
      res.status(200).json(info);
    } catch (e) {
      res.status(500).json(e);
    }
  },
};
