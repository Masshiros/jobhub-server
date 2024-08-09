const BookMark = require("../models/bookmark.model");
module.exports = {
  createBookmark: async (req, res) => {
    const jobID = req.body.job;

    try {
      const job = await Job.findById(jobID); 

      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }

      const newBook = new Bookmark({ job: job, userId: req.user.id }); // Create a new bookmark with the populated job data

      const savedBookmark = await newBook.save();

      const { __v, updatedAt, ...newBookmarkInfo } = savedBookmark._doc;

      res.status(200).json(newBookmarkInfo);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteBookmark: async (req, res) => {
    try {
      const userId = req.user.id;
      const jobId = req.params.id;

      await Bookmark.findOneAndDelete({ userId, jobId });

      res.status(200).json("Bookmark successfully deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getBookMarks: async (req, res) => {
    try {
      res
        .status(200)
        .json(
          await BookMark.find({ userId: req.user.id }).populate(
            "job",
            "-requirements"
          )
        );
    } catch (e) {
      res.status(500).json(e);
    }
  },
};
