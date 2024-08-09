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
  updateJob: async (req, res) => {
    try {
      const updatedJob = await Job.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { $new: true }
      );
      const { __v, createdAt, updatedAt, ...info } = updatedJob._doc;
      res.status(200).json(info);
    } catch (e) {
      res.status(500).json(e);
    }
  },
  deleteJob: async (req, res) => {
    try {
      await Job.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete Job Success");
    } catch (e) {
      res.status(500).json(e);
    }
  },
  getJob: async (req, res) => {
    try {
      res.status(200).json(await Job.findById(req.params.id));
    } catch (e) {
      res.status(500).json(e);
    }
  },
  getJobs: async (req, res) => {
    try {
      res.status(200).json(await Job.find());
    } catch (e) {
      res.status(500).json(e);
    }
  },
  searchJobs: async (req, res) => {
    try {
      const results = await Job.aggregate([
        {
          $search: {
            index: "jobsearch",
            text: {
              query: req.params.key,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);
      res.status(200).json(results);
    } catch (e) {
      res.status(500).json(e);
    }
  },
};
